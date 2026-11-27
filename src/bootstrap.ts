import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
// Default import (not `* as`): hbs exports a class instance whose methods live
// on the prototype, and `import * as` would drop them via __importStar.
import hbs from 'hbs';
import type { NextFunction, Request, Response } from 'express';
import { existsSync } from 'fs';
import helmet from 'helmet';
import { join } from 'path';
import { site } from './content/site.content';
import { registerHbsHelpers } from './view/hbs-helpers';

/**
 * Locate the directory holding views/ and public/.
 *
 * Run locally the compiled entry sits in dist/, so the root is one level up.
 * On a serverless platform the bundle is laid out differently and the process
 * runs from the deployment root, so probe both rather than assuming either.
 */
export function resolveProjectRoot(): string {
  const candidates = [process.cwd(), join(__dirname, '..'), join(__dirname, '..', '..')];
  const root = candidates.find((dir) => existsSync(join(dir, 'views', 'layouts', 'main.hbs')));

  if (!root) {
    throw new Error(
      `Could not locate the views directory. Looked in: ${candidates.join(', ')}. ` +
        'On a serverless host, make sure views/** is bundled with the function.',
    );
  }
  return root;
}

/** Partial registration is async — resolve it before the app serves traffic. */
function registerPartials(dir: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // `rename` identity keeps partial names identical to their filenames;
    // hbs would otherwise turn `request-bar.hbs` into `request_bar`.
    hbs.registerPartials(dir, { rename: (name: string) => name }, (error?: Error) =>
      error ? reject(error) : resolve(),
    );
  });
}


/**
 * SHA-256 of the one inline script in layouts/main.hbs. If that script's text
 * changes by even a character, regenerate this or the browser will block it:
 *   printf '%s' "<script body>" | openssl dgst -sha256 -binary | base64
 */
const INLINE_JS_FLAG_HASH = "'sha256-/x7W7R75k8Roq0WaVRQX9blP4OufE5xbAdzklGxsgpw='";

function applySecurityHeaders(app: NestExpressApplication): void {
  app.disable('x-powered-by');
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", INLINE_JS_FLAG_HASH],
          // Templates use inline style attributes for gradients and starfield positions.
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          // cdn.sanity.io serves catalogue product photos uploaded in the Studio.
          imgSrc: ["'self'", 'data:', 'https://images.unsplash.com', 'https://cdn.sanity.io'],
          mediaSrc: ["'self'"],
          connectSrc: ["'self'"],
          formAction: ["'self'"],
          frameAncestors: ["'none'"],
          objectSrc: ["'none'"],
          baseUri: ["'self'"],
          // Safari upgrades http://localhost too, which breaks local dev.
          upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null,
        },
      },
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    }),
  );
}

/**
 * Exposes canonicalUrl and noindex to every rendered view via res.locals.
 * Form round-trip URLs (?submitted, ?error) are kept out of the index so they
 * never compete with the clean page.
 */
function applySeoLocals(app: NestExpressApplication): void {
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Express routing is case-insensitive, so normalise to the lowercase route.
    const path = req.path.toLowerCase().replace(/\/+$/, '') || '/';
    res.locals.canonicalUrl = `${site.siteUrl}${path === '/' ? '/' : path}`;
    res.locals.noindex = 'submitted' in req.query || 'error' in req.query;
    next();
  });
}

export async function configureApp(app: NestExpressApplication): Promise<void> {
  const projectRoot = resolveProjectRoot();

  // Vercel sits in front of the function; trust its X-Forwarded-For so the
  // rate limiter sees each visitor's IP instead of the proxy's.
  app.set('trust proxy', 1);
  applySecurityHeaders(app);
  applySeoLocals(app);

  app.useStaticAssets(join(projectRoot, 'public'), {
    maxAge: process.env.NODE_ENV === 'production' ? '7d' : 0,
  });
  app.setBaseViewsDir(join(projectRoot, 'views'));
  app.setViewEngine('hbs');
  app.set('view options', { layout: 'layouts/main' });

  registerHbsHelpers();
  await registerPartials(join(projectRoot, 'views', 'partials'));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
    }),
  );
}

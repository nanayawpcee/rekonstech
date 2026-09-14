import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
// Default import (not `* as`): hbs exports a class instance whose methods live
// on the prototype, and `import * as` would drop them via __importStar.
import hbs from 'hbs';
import { existsSync } from 'fs';
import { join } from 'path';
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


export async function configureApp(app: NestExpressApplication): Promise<void> {
  const projectRoot = resolveProjectRoot();

  
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

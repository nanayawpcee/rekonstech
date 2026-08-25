import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
// Default import (not `* as`): hbs exports a class instance whose methods live
// on the prototype, and `import * as` would drop them via __importStar.
import hbs from 'hbs';
import { join } from 'path';
import { AppModule } from './app.module';
import { registerHbsHelpers } from './view/hbs-helpers';

/** Partial registration is async — resolve it before the server accepts traffic. */
function registerPartials(dir: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // `rename` identity keeps partial names identical to their filenames;
    // hbs would otherwise turn `request-bar.hbs` into `request_bar`.
    hbs.registerPartials(dir, { rename: (name: string) => name }, (error?: Error) =>
      error ? reject(error) : resolve(),
    );
  });
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // dist/main.js -> project root, so views/ and public/ resolve in dev and prod alike.
  const projectRoot = join(__dirname, '..');

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

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port, '0.0.0.0');
  Logger.log(`rekonstech landing page ready on http://localhost:${port}`, 'Bootstrap');
}

void bootstrap();

/**
 * Vercel serverless entry point.
 *
 * Imports from ../dist rather than ../src on purpose: Vercel compiles files in
 * this directory with esbuild, which does not support `emitDecoratorMetadata`.
 * Nest's constructor injection depends on that metadata, so the application
 * itself must be compiled by tsc (`npm run build`) and only this thin adapter
 * is left for esbuild.
 */
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import type { NestExpressApplication } from '@nestjs/platform-express';
import express from 'express';
import type { Request, Response } from 'express';
import { AppModule } from '../dist/app.module';
import { configureApp } from '../dist/bootstrap';

const server = express();

// One bootstrap per warm instance: the promise is cached, so concurrent
// requests during a cold start all await the same initialisation.
let ready: Promise<void> | undefined;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
    { logger: ['error', 'warn', 'log'] },
  );
  await configureApp(app);
  await app.init();
}

export default async function handler(req: Request, res: Response): Promise<void> {
  if (!ready) ready = bootstrap();
  await ready;
  server(req, res);
}

import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';

/**
 * Keeps the form usable without JavaScript.
 *
 * Browsers posting the plain <form> get redirected back to the request bar with
 * an error flag; fetch/XHR clients still receive the normal JSON error body.
 */
@Catch(BadRequestException)
export class FormErrorFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const body = exception.getResponse() as { message?: string | string[] };

    const wantsHtml =
      !request.xhr &&
      request.accepts(['html', 'json']) === 'html' &&
      !(request.headers['content-type'] ?? '').includes('application/json');

    if (wantsHtml) {
      const first = Array.isArray(body?.message) ? body.message[0] : body?.message;
      const reason = encodeURIComponent(first ?? 'Please check your details and try again.');
      response.redirect(HttpStatus.SEE_OTHER, `/?error=${reason}#request`);
      return;
    }

    response.status(HttpStatus.BAD_REQUEST).json({
      ok: false,
      errors: Array.isArray(body?.message) ? body.message : [body?.message ?? 'Invalid request.'],
    });
  }
}

import { Body, Controller, HttpStatus, Post, Req, Res, UseFilters } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import type { Request, Response } from 'express';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { FormErrorFilter } from './form-error.filter';
import { ServiceRequestsService } from './service-requests.service';

@Controller('api/service-requests')
@UseFilters(FormErrorFilter)
export class ServiceRequestsController {
  constructor(private readonly serviceRequests: ServiceRequestsService) {}

  /** Quick request bar. Five submissions per minute per IP is plenty for a human. */
  @Post()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  async create(
    @Body() dto: CreateServiceRequestDto,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    // Honeypot tripped: answer like a success so bots stop retrying, store nothing.
    const isBot = Boolean(dto.company && dto.company.length > 0);
    const reference = isBot ? null : (await this.serviceRequests.create(dto)).reference;

    const wantsHtml =
      !request.xhr &&
      request.accepts(['html', 'json']) === 'html' &&
      !(request.headers['content-type'] ?? '').includes('application/json');

    if (wantsHtml) {
      response.redirect(HttpStatus.SEE_OTHER, '/?submitted=1#request');
      return;
    }

    response.status(HttpStatus.CREATED).json({
      ok: true,
      reference,
      message: 'Thank you — a rekonstech consultant will call you back shortly.',
    });
  }
}

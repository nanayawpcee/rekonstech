import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { appendFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';

export interface StoredServiceRequest extends Omit<CreateServiceRequestDto, 'company'> {
  reference: string;
  receivedAt: string;
}


@Injectable()
export class ServiceRequestsService implements OnModuleInit {
  private readonly logger = new Logger(ServiceRequestsService.name);
  private readonly dataDir = join(process.cwd(), 'data');
  private readonly dataFile = join(this.dataDir, 'service-requests.jsonl');
  private readonly webhookUrl = process.env.SERVICE_REQUEST_WEBHOOK_URL;


  private canWriteFile = false;

  async onModuleInit(): Promise<void> {
    if (this.webhookUrl) {
      this.logger.log('Service requests will be delivered to the configured webhook.');
      return;
    }

    try {
      await mkdir(this.dataDir, { recursive: true });
      this.canWriteFile = true;
    } catch {
      this.canWriteFile = false;
      this.logger.warn(
        'No writable data directory and no SERVICE_REQUEST_WEBHOOK_URL set. ' +
          'Submissions will only appear in the logs — set the webhook before launch.',
      );
    }
  }

  async create(dto: CreateServiceRequestDto): Promise<StoredServiceRequest> {
    const { company: _honeypot, ...payload } = dto;

    const record: StoredServiceRequest = {
      ...payload,
      reference: this.generateReference(),
      receivedAt: new Date().toISOString(),
    };

    await this.deliver(record);

    // Reference and category only — contact details stay out of the normal log.
    this.logger.log(`New service request ${record.reference} (${record.serviceCategory})`);
    return record;
  }

  private async deliver(record: StoredServiceRequest): Promise<void> {
    if (this.webhookUrl) {
      try {
        const response = await fetch(this.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record),
        });
        if (!response.ok) throw new Error(`webhook responded ${response.status}`);
        return;
      } catch (error) {

        this.logger.error(
          `Webhook delivery failed for ${record.reference}: ${(error as Error).message}`,
        );
      }
    } else if (this.canWriteFile) {
      try {
        await appendFile(this.dataFile, `${JSON.stringify(record)}\n`, 'utf8');
        return;
      } catch (error) {
        this.logger.error(`File write failed for ${record.reference}: ${(error as Error).message}`);
      }
    }

    this.logger.warn(`UNDELIVERED SERVICE REQUEST — capture manually: ${JSON.stringify(record)}`);
  }

  private generateReference(): string {
    const stamp = Date.now().toString(36).toUpperCase();
    const noise = Math.floor(Math.random() * 1296)
      .toString(36)
      .toUpperCase()
      .padStart(2, '0');
    return `REK-${stamp}-${noise}`;
  }
}

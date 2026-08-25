import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { mkdir, appendFile } from 'fs/promises';
import { join } from 'path';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';

export interface StoredServiceRequest extends Omit<CreateServiceRequestDto, 'company'> {
  reference: string;
  receivedAt: string;
}

/**
 * Persists quick-request submissions as newline-delimited JSON.
 *
 * Deliberately dependency-free so the landing page runs anywhere. Swap
 * `persist()` for your CRM, mailer or database when you wire up the real
 * back office — nothing else needs to change.
 */
@Injectable()
export class ServiceRequestsService implements OnModuleInit {
  private readonly logger = new Logger(ServiceRequestsService.name);
  private readonly dataDir = join(process.cwd(), 'data');
  private readonly dataFile = join(this.dataDir, 'service-requests.jsonl');

  async onModuleInit(): Promise<void> {
    await mkdir(this.dataDir, { recursive: true });
  }

  async create(dto: CreateServiceRequestDto): Promise<StoredServiceRequest> {
    const { company: _honeypot, ...payload } = dto;

    const record: StoredServiceRequest = {
      ...payload,
      reference: this.generateReference(),
      receivedAt: new Date().toISOString(),
    };

    await this.persist(record);

    // Log the reference and category only — contact details stay out of logs.
    this.logger.log(`New service request ${record.reference} (${record.serviceCategory})`);
    return record;
  }

  private async persist(record: StoredServiceRequest): Promise<void> {
    await appendFile(this.dataFile, `${JSON.stringify(record)}\n`, 'utf8');
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

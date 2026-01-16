import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
// biome-ignore lint/style/useImportType: NestJS needs these as values for DI
import { DataSource, Repository } from 'typeorm';
import { Event } from '@/leads/domain/entities/event.entity';
import { Lead, type LeadStatus } from '@/leads/domain/entities/lead.entity';
import type { LeadRepository } from '@/leads/domain/repositories/lead.repository';

@Injectable()
export class TypeOrmLeadRepository implements LeadRepository {
  private readonly leadRepo: Repository<Lead>;
  private readonly eventRepo: Repository<Event>;

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    this.leadRepo = this.dataSource.getRepository(Lead);
    this.eventRepo = this.dataSource.getRepository(Event);
  }

  async save(lead: Lead): Promise<Lead> {
    return this.leadRepo.save(lead);
  }

  async findById(id: string): Promise<Lead | null> {
    return this.leadRepo.findOne({
      where: { id },
      relations: ['events'],
      order: {
        events: {
          timestamp: 'ASC',
        },
      },
    });
  }

  async saveEvent(event: Event): Promise<Event> {
    return this.eventRepo.save(event);
  }

  async updateStatus(id: string, status: string): Promise<void> {
    // Cast string to enum or simple object update
    await this.leadRepo.update(id, { status: status as LeadStatus });
  }
}

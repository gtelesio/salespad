import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Event } from '@/leads/domain/entities/event.entity';
import { Lead, type LeadStatus } from '@/leads/domain/entities/lead.entity';
import { LeadRepository } from '@/leads/domain/repositories/lead.repository';

@Injectable()
export class TypeOrmLeadRepository implements LeadRepository {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepo: Repository<Lead>,
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
  ) { }

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

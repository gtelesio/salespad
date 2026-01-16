import { Inject, Injectable } from '@nestjs/common';
import { Event, EventType } from '@/leads/domain/entities/event.entity';
import { Lead } from '@/leads/domain/entities/lead.entity';
import { LEAD_REPOSITORY, type LeadRepository } from '@/leads/domain/repositories/lead.repository';

@Injectable()
export class CreateLeadUseCase {
  constructor(@Inject(LEAD_REPOSITORY) private readonly leadRepository: LeadRepository) {}

  async execute(name: string, contactInfo: string): Promise<Lead> {
    const lead = new Lead();
    lead.name = name;
    lead.contactInfo = contactInfo;

    const savedLead = await this.leadRepository.save(lead);

    const event = new Event();
    event.type = EventType.CREATED;
    event.content = 'Lead created';
    event.lead = savedLead;
    await this.leadRepository.saveEvent(event);

    return savedLead;
  }
}

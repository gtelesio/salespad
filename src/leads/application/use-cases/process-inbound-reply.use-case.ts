import { Inject, Injectable } from '@nestjs/common';
import { Event, EventType } from '@/leads/domain/entities/event.entity';
import { LEAD_REPOSITORY, type LeadRepository } from '@/leads/domain/repositories/lead.repository';

@Injectable()
export class ProcessInboundReplyUseCase {
  constructor(@Inject(LEAD_REPOSITORY) private readonly leadRepository: LeadRepository) {}

  async execute(leadId: string, content: string): Promise<void> {
    const lead = await this.leadRepository.findById(leadId);
    if (!lead) throw new Error('Lead not found');

    // 1. Log Event
    const event = new Event();
    event.type = EventType.INBOUND;
    event.content = content;
    event.lead = lead;
    await this.leadRepository.saveEvent(event);

    // 2. Update Status
    await this.leadRepository.updateStatus(leadId, 'replied');
  }
}

import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import type { Queue } from 'bullmq';
import type { MessageJobData } from '@/leads/application/interfaces/message-job.interface';
import { Event, EventType } from '@/leads/domain/entities/event.entity';
import { LeadRepository } from '@/leads/domain/repositories/lead.repository';

@Injectable()
export class SendOutboundMessageUseCase {
  constructor(
    private readonly leadRepository: LeadRepository,
    @InjectQueue('message-queue') private readonly messageQueue: Queue,
  ) { }

  async execute(leadId: string, message: string): Promise<void> {
    const lead = await this.leadRepository.findById(leadId);
    if (!lead) throw new Error('Lead not found');

    // 1. Log Event
    const event = new Event();
    event.type = EventType.OUTBOUND;
    event.content = `[${lead.channel}] ${message}`; // Tag event with channel
    event.lead = lead;
    await this.leadRepository.saveEvent(event);

    // 2. Add to Queue
    await this.messageQueue.add(
      'send-message',
      {
        leadId,
        contactInfo: lead.contactInfo,
        channel: lead.channel,
        message,
      } as MessageJobData,
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    );

    // 3. Update Status
    // Avoid using lead.save() to prevent overwriting new events
    await this.leadRepository.updateStatus(leadId, 'contacted');
  }
}

import { Injectable } from '@nestjs/common';
import { Event, EventType } from '../../domain/entities/event.entity';
import type { LeadRepository } from '../../domain/repositories/lead.repository';
import type { AiMockService } from '../services/ai-mock.service';
import type { SendOutboundMessageUseCase } from './send-outbound-message.use-case';

@Injectable()
export class GenerateAiReplyUseCase {
  constructor(
    private readonly leadRepository: LeadRepository,
    private readonly aiMockService: AiMockService,
    private readonly sendOutboundMessageUseCase: SendOutboundMessageUseCase,
  ) {}

  async execute(leadId: string): Promise<string> {
    const lead = await this.leadRepository.findById(leadId);
    if (!lead) throw new Error('Lead not found');

    // 1. Get Conversation History (Simplified: Just use last event or simplistic context)
    // For MVP, we pass the last inbound message content to the AI
    const lastInbound = lead.events
      .filter((e) => e.type === EventType.INBOUND)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];

    const prompt = lastInbound ? lastInbound.content : 'Hello';

    // 2. Generate Reply
    const replyContent = this.aiMockService.generateReply(prompt);

    // 3. Log AI Decision (System Log)
    const logEvent = new Event();
    logEvent.type = EventType.SYSTEM_LOG;
    logEvent.content = `AI generated reply: "${replyContent}" based on input: "${prompt}"`;
    logEvent.lead = lead;
    await this.leadRepository.saveEvent(logEvent);

    // 4. Send the Reply (reuse SendOutboundMessage logic which handles Queue & Outbound Event)
    await this.sendOutboundMessageUseCase.execute(leadId, replyContent);

    return replyContent;
  }
}

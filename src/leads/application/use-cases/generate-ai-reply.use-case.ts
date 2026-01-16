import { Inject, Injectable } from '@nestjs/common';
import { Event, EventType } from '@/leads/domain/entities/event.entity';
import { LEAD_REPOSITORY, type LeadRepository } from '@/leads/domain/repositories/lead.repository';
import { OpenAiService } from '@/leads/infrastructure/services/openai.service';
import { SendOutboundMessageUseCase } from './send-outbound-message.use-case';

@Injectable()
export class GenerateAiReplyUseCase {
  constructor(
    @Inject(LEAD_REPOSITORY) private readonly leadRepository: LeadRepository,
    @Inject(OpenAiService) private readonly openAiService: OpenAiService,
    @Inject(SendOutboundMessageUseCase)
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

    // Fallback prompt if no previous interaction
    const prompt = lastInbound ? lastInbound.content : 'User just signed up. Say hello.';

    // 2. Generate Reply
    // Wait... if use case is "GenerateAiReply", we probably expect there to be a message to reply TO.
    // If prompt is empty, maybe handled inside service or here.

    const replyContent = await this.openAiService.generateReply(prompt);

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

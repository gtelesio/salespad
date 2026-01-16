import type { LeadRepository } from '../../domain/repositories/lead.repository';
import type { AiMockService } from '../services/ai-mock.service';
import type { SendOutboundMessageUseCase } from './send-outbound-message.use-case';
export declare class GenerateAiReplyUseCase {
    private readonly leadRepository;
    private readonly aiMockService;
    private readonly sendOutboundMessageUseCase;
    constructor(leadRepository: LeadRepository, aiMockService: AiMockService, sendOutboundMessageUseCase: SendOutboundMessageUseCase);
    execute(leadId: string): Promise<string>;
}

import type { CreateLeadUseCase } from '../../application/use-cases/create-lead.use-case';
import type { GenerateAiReplyUseCase } from '../../application/use-cases/generate-ai-reply.use-case';
import type { GetLeadUseCase } from '../../application/use-cases/get-lead.use-case';
import type { ProcessInboundReplyUseCase } from '../../application/use-cases/process-inbound-reply.use-case';
import type { SendOutboundMessageUseCase } from '../../application/use-cases/send-outbound-message.use-case';
import type { AiReplyRequestDto } from '../../presentation/dtos/ai-reply-request.dto';
import type { CreateLeadRequestDto } from '../../presentation/dtos/create-lead-request.dto';
import type { ReplyRequestDto } from '../../presentation/dtos/reply-request.dto';
import type { SendMessageRequestDto } from '../../presentation/dtos/send-message-request.dto';
export declare class LeadsController {
    private readonly createLeadUseCase;
    private readonly sendOutboundMessageUseCase;
    private readonly processInboundReplyUseCase;
    private readonly generateAiReplyUseCase;
    private readonly getLeadUseCase;
    constructor(createLeadUseCase: CreateLeadUseCase, sendOutboundMessageUseCase: SendOutboundMessageUseCase, processInboundReplyUseCase: ProcessInboundReplyUseCase, generateAiReplyUseCase: GenerateAiReplyUseCase, getLeadUseCase: GetLeadUseCase);
    create(body: CreateLeadRequestDto): Promise<import("../../domain/entities/lead.entity").Lead>;
    send(body: SendMessageRequestDto): Promise<{
        status: string;
    }>;
    reply(body: ReplyRequestDto): Promise<{
        status: string;
    }>;
    aiReply(body: AiReplyRequestDto): Promise<{
        status: string;
        reply: string;
    }>;
    get(id: string): Promise<import("../../domain/entities/lead.entity").Lead | null>;
}

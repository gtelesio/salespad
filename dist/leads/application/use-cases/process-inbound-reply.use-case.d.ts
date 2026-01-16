import type { LeadRepository } from '../../domain/repositories/lead.repository';
export declare class ProcessInboundReplyUseCase {
    private readonly leadRepository;
    constructor(leadRepository: LeadRepository);
    execute(leadId: string, content: string): Promise<void>;
}

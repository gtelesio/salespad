import type { Queue } from 'bullmq';
import type { LeadRepository } from '../../domain/repositories/lead.repository';
export declare class SendOutboundMessageUseCase {
    private readonly leadRepository;
    private readonly emailQueue;
    constructor(leadRepository: LeadRepository, emailQueue: Queue);
    execute(leadId: string, message: string): Promise<void>;
}

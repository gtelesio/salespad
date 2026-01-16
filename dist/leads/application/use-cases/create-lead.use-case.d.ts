import { Lead } from '../../domain/entities/lead.entity';
import type { LeadRepository } from '../../domain/repositories/lead.repository';
export declare class CreateLeadUseCase {
    private readonly leadRepository;
    constructor(leadRepository: LeadRepository);
    execute(name: string, contactInfo: string): Promise<Lead>;
}

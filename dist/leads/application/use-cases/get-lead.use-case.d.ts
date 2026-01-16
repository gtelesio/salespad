import type { Lead } from '../../domain/entities/lead.entity';
import type { LeadRepository } from '../../domain/repositories/lead.repository';
export declare class GetLeadUseCase {
    private readonly leadRepository;
    constructor(leadRepository: LeadRepository);
    execute(id: string): Promise<Lead | null>;
}

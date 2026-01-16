import type { Repository } from 'typeorm';
import { Event } from '../../domain/entities/event.entity';
import { Lead } from '../../domain/entities/lead.entity';
import type { LeadRepository } from '../../domain/repositories/lead.repository';
export declare class TypeOrmLeadRepository implements LeadRepository {
    private readonly leadRepo;
    private readonly eventRepo;
    constructor(leadRepo: Repository<Lead>, eventRepo: Repository<Event>);
    save(lead: Lead): Promise<Lead>;
    findById(id: string): Promise<Lead | null>;
    saveEvent(event: Event): Promise<Event>;
    updateStatus(id: string, status: string): Promise<void>;
}

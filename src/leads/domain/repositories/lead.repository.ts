import type { Event } from '@/leads/domain/entities/event.entity';
import type { Lead } from '@/leads/domain/entities/lead.entity';

export abstract class LeadRepository {
  abstract save(lead: Lead): Promise<Lead>;
  abstract findById(id: string): Promise<Lead | null>;
  abstract saveEvent(event: Event): Promise<Event>;
  abstract updateStatus(id: string, status: string): Promise<void>;
}

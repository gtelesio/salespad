import type { Event } from '../entities/event.entity';
import type { Lead } from '../entities/lead.entity';

export abstract class LeadRepository {
  abstract save(lead: Lead): Promise<Lead>;
  abstract findById(id: string): Promise<Lead | null>;
  abstract saveEvent(event: Event): Promise<Event>;
  abstract updateStatus(id: string, status: string): Promise<void>;
}

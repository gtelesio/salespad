import type { Channel } from '@/leads/domain/entities/lead.entity';

export interface MessageJobData {
  leadId: string;
  contactInfo: string;
  channel: Channel;
  message: string;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Lead } from './lead.entity';

export enum EventType {
  CREATED = 'created',
  OUTBOUND = 'outbound',
  INBOUND = 'inbound',
  SYSTEM_LOG = 'system_log',
  AI_REPLY = 'ai_reply',
}

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: EventType,
  })
  type: EventType;

  @Column('text')
  content: string;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(
    () => require('./lead.entity').Lead,
    (lead: Lead) => lead.events,
  )
  @JoinColumn({ name: 'lead_id' })
  lead: Lead;
}

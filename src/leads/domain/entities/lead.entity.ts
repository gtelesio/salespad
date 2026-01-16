import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './event.entity';

export enum LeadStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  REPLIED = 'replied',
  CONVERTED = 'converted',
}

export enum Channel {
  EMAIL = 'email',
  WHATSAPP = 'whatsapp',
  LINKEDIN = 'linkedin',
}

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  contactInfo: string;

  @Column({
    type: 'enum',
    enum: Channel,
    default: Channel.EMAIL,
  })
  channel: Channel;

  @Column({
    type: 'enum',
    enum: LeadStatus,
    default: LeadStatus.NEW,
  })
  status: LeadStatus;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(
    () => Event,
    (event) => event.lead,
  )
  events: Event[];

  markContacted() {
    this.status = LeadStatus.CONTACTED;
  }

  markReplied() {
    this.status = LeadStatus.REPLIED;
  }
}

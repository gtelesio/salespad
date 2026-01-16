import { Lead } from './lead.entity';
export declare enum EventType {
    CREATED = "created",
    OUTBOUND = "outbound",
    INBOUND = "inbound",
    SYSTEM_LOG = "system_log",
    AI_REPLY = "ai_reply"
}
export declare class Event {
    id: string;
    type: EventType;
    content: string;
    timestamp: Date;
    lead: Lead;
}

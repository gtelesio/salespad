import { Event } from './event.entity';
export declare enum LeadStatus {
    NEW = "new",
    CONTACTED = "contacted",
    REPLIED = "replied",
    CONVERTED = "converted"
}
export declare class Lead {
    id: string;
    name: string;
    contactInfo: string;
    status: LeadStatus;
    createdAt: Date;
    events: Event[];
    markContacted(): void;
    markReplied(): void;
}

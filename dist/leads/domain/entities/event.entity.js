"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = exports.EventType = void 0;
const typeorm_1 = require("typeorm");
const lead_entity_1 = require("./lead.entity");
var EventType;
(function (EventType) {
    EventType["CREATED"] = "created";
    EventType["OUTBOUND"] = "outbound";
    EventType["INBOUND"] = "inbound";
    EventType["SYSTEM_LOG"] = "system_log";
    EventType["AI_REPLY"] = "ai_reply";
})(EventType || (exports.EventType = EventType = {}));
let Event = class Event {
    id;
    type;
    content;
    timestamp;
    lead;
};
exports.Event = Event;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Event.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EventType,
    }),
    __metadata("design:type", String)
], Event.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Event.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Event.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lead_entity_1.Lead, (lead) => lead.events),
    (0, typeorm_1.JoinColumn)({ name: 'lead_id' }),
    __metadata("design:type", lead_entity_1.Lead)
], Event.prototype, "lead", void 0);
exports.Event = Event = __decorate([
    (0, typeorm_1.Entity)('events')
], Event);
//# sourceMappingURL=event.entity.js.map
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
exports.ProcessInboundReplyUseCase = void 0;
const common_1 = require("@nestjs/common");
const event_entity_1 = require("../../domain/entities/event.entity");
let ProcessInboundReplyUseCase = class ProcessInboundReplyUseCase {
    leadRepository;
    constructor(leadRepository) {
        this.leadRepository = leadRepository;
    }
    async execute(leadId, content) {
        const lead = await this.leadRepository.findById(leadId);
        if (!lead)
            throw new Error('Lead not found');
        const event = new event_entity_1.Event();
        event.type = event_entity_1.EventType.INBOUND;
        event.content = content;
        event.lead = lead;
        await this.leadRepository.saveEvent(event);
        await this.leadRepository.updateStatus(leadId, 'replied');
    }
};
exports.ProcessInboundReplyUseCase = ProcessInboundReplyUseCase;
exports.ProcessInboundReplyUseCase = ProcessInboundReplyUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Function])
], ProcessInboundReplyUseCase);
//# sourceMappingURL=process-inbound-reply.use-case.js.map
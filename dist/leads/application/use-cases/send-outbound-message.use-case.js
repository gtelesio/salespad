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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendOutboundMessageUseCase = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const event_entity_1 = require("../../domain/entities/event.entity");
let SendOutboundMessageUseCase = class SendOutboundMessageUseCase {
    leadRepository;
    emailQueue;
    constructor(leadRepository, emailQueue) {
        this.leadRepository = leadRepository;
        this.emailQueue = emailQueue;
    }
    async execute(leadId, message) {
        const lead = await this.leadRepository.findById(leadId);
        if (!lead)
            throw new Error('Lead not found');
        const event = new event_entity_1.Event();
        event.type = event_entity_1.EventType.OUTBOUND;
        event.content = message;
        event.lead = lead;
        await this.leadRepository.saveEvent(event);
        await this.emailQueue.add('send-email', {
            leadId,
            email: lead.contactInfo,
            message,
        }, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 1000,
            },
        });
        await this.leadRepository.updateStatus(leadId, 'contacted');
    }
};
exports.SendOutboundMessageUseCase = SendOutboundMessageUseCase;
exports.SendOutboundMessageUseCase = SendOutboundMessageUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, bullmq_1.InjectQueue)('email-queue')),
    __metadata("design:paramtypes", [Function, Function])
], SendOutboundMessageUseCase);
//# sourceMappingURL=send-outbound-message.use-case.js.map
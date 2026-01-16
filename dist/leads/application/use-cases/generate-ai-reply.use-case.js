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
exports.GenerateAiReplyUseCase = void 0;
const common_1 = require("@nestjs/common");
const event_entity_1 = require("../../domain/entities/event.entity");
let GenerateAiReplyUseCase = class GenerateAiReplyUseCase {
    leadRepository;
    aiMockService;
    sendOutboundMessageUseCase;
    constructor(leadRepository, aiMockService, sendOutboundMessageUseCase) {
        this.leadRepository = leadRepository;
        this.aiMockService = aiMockService;
        this.sendOutboundMessageUseCase = sendOutboundMessageUseCase;
    }
    async execute(leadId) {
        const lead = await this.leadRepository.findById(leadId);
        if (!lead)
            throw new Error('Lead not found');
        const lastInbound = lead.events
            .filter((e) => e.type === event_entity_1.EventType.INBOUND)
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
        const prompt = lastInbound ? lastInbound.content : 'Hello';
        const replyContent = this.aiMockService.generateReply(prompt);
        const logEvent = new event_entity_1.Event();
        logEvent.type = event_entity_1.EventType.SYSTEM_LOG;
        logEvent.content = `AI generated reply: "${replyContent}" based on input: "${prompt}"`;
        logEvent.lead = lead;
        await this.leadRepository.saveEvent(logEvent);
        await this.sendOutboundMessageUseCase.execute(leadId, replyContent);
        return replyContent;
    }
};
exports.GenerateAiReplyUseCase = GenerateAiReplyUseCase;
exports.GenerateAiReplyUseCase = GenerateAiReplyUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Function, Function, Function])
], GenerateAiReplyUseCase);
//# sourceMappingURL=generate-ai-reply.use-case.js.map
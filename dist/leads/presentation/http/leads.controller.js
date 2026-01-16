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
exports.LeadsController = void 0;
const common_1 = require("@nestjs/common");
let LeadsController = class LeadsController {
    createLeadUseCase;
    sendOutboundMessageUseCase;
    processInboundReplyUseCase;
    generateAiReplyUseCase;
    getLeadUseCase;
    constructor(createLeadUseCase, sendOutboundMessageUseCase, processInboundReplyUseCase, generateAiReplyUseCase, getLeadUseCase) {
        this.createLeadUseCase = createLeadUseCase;
        this.sendOutboundMessageUseCase = sendOutboundMessageUseCase;
        this.processInboundReplyUseCase = processInboundReplyUseCase;
        this.generateAiReplyUseCase = generateAiReplyUseCase;
        this.getLeadUseCase = getLeadUseCase;
    }
    async create(body) {
        return this.createLeadUseCase.execute(body.name, body.contactInfo);
    }
    async send(body) {
        await this.sendOutboundMessageUseCase.execute(body.leadId, body.message);
        return { status: 'queued' };
    }
    async reply(body) {
        await this.processInboundReplyUseCase.execute(body.leadId, body.content);
        return { status: 'processed' };
    }
    async aiReply(body) {
        const reply = await this.generateAiReplyUseCase.execute(body.leadId);
        return { status: 'generated', reply };
    }
    async get(id) {
        return this.getLeadUseCase.execute(id);
    }
};
exports.LeadsController = LeadsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", Promise)
], LeadsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('send'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", Promise)
], LeadsController.prototype, "send", null);
__decorate([
    (0, common_1.Post)('reply'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", Promise)
], LeadsController.prototype, "reply", null);
__decorate([
    (0, common_1.Post)('ai-reply'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", Promise)
], LeadsController.prototype, "aiReply", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LeadsController.prototype, "get", null);
exports.LeadsController = LeadsController = __decorate([
    (0, common_1.Controller)('leads'),
    __metadata("design:paramtypes", [Function, Function, Function, Function, Function])
], LeadsController);
//# sourceMappingURL=leads.controller.js.map
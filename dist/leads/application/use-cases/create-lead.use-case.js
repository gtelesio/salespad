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
exports.CreateLeadUseCase = void 0;
const common_1 = require("@nestjs/common");
const event_entity_1 = require("../../domain/entities/event.entity");
const lead_entity_1 = require("../../domain/entities/lead.entity");
let CreateLeadUseCase = class CreateLeadUseCase {
    leadRepository;
    constructor(leadRepository) {
        this.leadRepository = leadRepository;
    }
    async execute(name, contactInfo) {
        const lead = new lead_entity_1.Lead();
        lead.name = name;
        lead.contactInfo = contactInfo;
        const savedLead = await this.leadRepository.save(lead);
        const event = new event_entity_1.Event();
        event.type = event_entity_1.EventType.CREATED;
        event.content = 'Lead created';
        event.lead = savedLead;
        await this.leadRepository.saveEvent(event);
        return savedLead;
    }
};
exports.CreateLeadUseCase = CreateLeadUseCase;
exports.CreateLeadUseCase = CreateLeadUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Function])
], CreateLeadUseCase);
//# sourceMappingURL=create-lead.use-case.js.map
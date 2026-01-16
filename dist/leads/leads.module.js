"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsModule = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ai_mock_service_1 = require("./application/services/ai-mock.service");
const create_lead_use_case_1 = require("./application/use-cases/create-lead.use-case");
const generate_ai_reply_use_case_1 = require("./application/use-cases/generate-ai-reply.use-case");
const get_lead_use_case_1 = require("./application/use-cases/get-lead.use-case");
const process_inbound_reply_use_case_1 = require("./application/use-cases/process-inbound-reply.use-case");
const send_outbound_message_use_case_1 = require("./application/use-cases/send-outbound-message.use-case");
const event_entity_1 = require("./domain/entities/event.entity");
const lead_entity_1 = require("./domain/entities/lead.entity");
const lead_repository_1 = require("./domain/repositories/lead.repository");
const typeorm_lead_repository_1 = require("./infrastructure/persistence/typeorm-lead.repository");
const email_processor_1 = require("./infrastructure/queues/consumers/email.processor");
const leads_controller_1 = require("./presentation/http/leads.controller");
let LeadsModule = class LeadsModule {
};
exports.LeadsModule = LeadsModule;
exports.LeadsModule = LeadsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([lead_entity_1.Lead, event_entity_1.Event]),
            bullmq_1.BullModule.registerQueue({
                name: 'email-queue',
            }),
        ],
        controllers: [leads_controller_1.LeadsController],
        providers: [
            {
                provide: lead_repository_1.LeadRepository,
                useClass: typeorm_lead_repository_1.TypeOrmLeadRepository,
            },
            create_lead_use_case_1.CreateLeadUseCase,
            get_lead_use_case_1.GetLeadUseCase,
            send_outbound_message_use_case_1.SendOutboundMessageUseCase,
            process_inbound_reply_use_case_1.ProcessInboundReplyUseCase,
            generate_ai_reply_use_case_1.GenerateAiReplyUseCase,
            ai_mock_service_1.AiMockService,
            email_processor_1.EmailProcessor,
        ],
    })
], LeadsModule);
//# sourceMappingURL=leads.module.js.map
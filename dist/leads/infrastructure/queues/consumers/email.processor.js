"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EmailProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
let EmailProcessor = EmailProcessor_1 = class EmailProcessor extends bullmq_1.WorkerHost {
    logger = new common_1.Logger(EmailProcessor_1.name);
    async process(job) {
        this.logger.log(`Processing job ${job.id} of type ${job.name}`);
        this.logger.debug(`Sending email to ${job.data.email} with content: ${job.data.message}`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (Math.random() < 0.1) {
            this.logger.error('Failed to send email (Simulated)');
            throw new Error('Random failure for retry testing');
        }
        this.logger.log(`Email sent successfully to ${job.data.email}`);
    }
};
exports.EmailProcessor = EmailProcessor;
exports.EmailProcessor = EmailProcessor = EmailProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('email-queue')
], EmailProcessor);
//# sourceMappingURL=email.processor.js.map
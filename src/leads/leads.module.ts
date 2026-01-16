import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiMockService } from './application/services/ai-mock.service';
import { CreateLeadUseCase } from './application/use-cases/create-lead.use-case';
import { GenerateAiReplyUseCase } from './application/use-cases/generate-ai-reply.use-case';
import { GetLeadUseCase } from './application/use-cases/get-lead.use-case';
import { ProcessInboundReplyUseCase } from './application/use-cases/process-inbound-reply.use-case';
import { SendOutboundMessageUseCase } from './application/use-cases/send-outbound-message.use-case';
import { Event } from './domain/entities/event.entity';
import { Lead } from './domain/entities/lead.entity';
import { LeadRepository } from './domain/repositories/lead.repository';
import { TypeOrmLeadRepository } from './infrastructure/persistence/typeorm-lead.repository';
import { EmailProcessor } from './infrastructure/queues/consumers/email.processor';
import { LeadsController } from './presentation/http/leads.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lead, Event]),
    BullModule.registerQueue({
      name: 'email-queue',
    }),
  ],
  controllers: [LeadsController],
  providers: [
    // Repositories
    {
      provide: LeadRepository,
      useClass: TypeOrmLeadRepository,
    },
    // Use Cases
    CreateLeadUseCase,
    GetLeadUseCase,
    SendOutboundMessageUseCase,
    ProcessInboundReplyUseCase,
    GenerateAiReplyUseCase,
    // Services
    AiMockService,
    // Consumers
    EmailProcessor,
  ],
})
export class LeadsModule {}

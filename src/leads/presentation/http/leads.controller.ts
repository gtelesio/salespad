import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import type { CreateLeadUseCase } from '../../application/use-cases/create-lead.use-case';
import type { GenerateAiReplyUseCase } from '../../application/use-cases/generate-ai-reply.use-case';
import type { GetLeadUseCase } from '../../application/use-cases/get-lead.use-case';
import type { ProcessInboundReplyUseCase } from '../../application/use-cases/process-inbound-reply.use-case';
import type { SendOutboundMessageUseCase } from '../../application/use-cases/send-outbound-message.use-case';
import type { AiReplyRequestDto } from '../../presentation/dtos/ai-reply-request.dto';
import type { CreateLeadRequestDto } from '../../presentation/dtos/create-lead-request.dto';
import type { ReplyRequestDto } from '../../presentation/dtos/reply-request.dto';
import type { SendMessageRequestDto } from '../../presentation/dtos/send-message-request.dto';

@Controller('leads')
export class LeadsController {
  constructor(
    private readonly createLeadUseCase: CreateLeadUseCase,
    private readonly sendOutboundMessageUseCase: SendOutboundMessageUseCase,
    private readonly processInboundReplyUseCase: ProcessInboundReplyUseCase,
    private readonly generateAiReplyUseCase: GenerateAiReplyUseCase,
    private readonly getLeadUseCase: GetLeadUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateLeadRequestDto) {
    return this.createLeadUseCase.execute(body.name, body.contactInfo);
  }

  @Post('send')
  async send(@Body() body: SendMessageRequestDto) {
    await this.sendOutboundMessageUseCase.execute(body.leadId, body.message);
    return { status: 'queued' };
  }

  @Post('reply')
  async reply(@Body() body: ReplyRequestDto) {
    await this.processInboundReplyUseCase.execute(body.leadId, body.content);
    return { status: 'processed' };
  }

  @Post('ai-reply')
  async aiReply(@Body() body: AiReplyRequestDto) {
    const reply = await this.generateAiReplyUseCase.execute(body.leadId);
    return { status: 'generated', reply };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.getLeadUseCase.execute(id);
  }
}

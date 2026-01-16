import { Test, TestingModule } from '@nestjs/testing';
import { LeadsController } from '@/leads/presentation/http/leads.controller';
import { CreateLeadUseCase } from '@/leads/application/use-cases/create-lead.use-case';
import { SendOutboundMessageUseCase } from '@/leads/application/use-cases/send-outbound-message.use-case';
import { ProcessInboundReplyUseCase } from '@/leads/application/use-cases/process-inbound-reply.use-case';
import { GenerateAiReplyUseCase } from '@/leads/application/use-cases/generate-ai-reply.use-case';
import { GetLeadUseCase } from '@/leads/application/use-cases/get-lead.use-case';
import { Lead } from '@/leads/domain/entities/lead.entity';

describe('LeadsController', () => {
    let controller: LeadsController;
    let createLeadUseCase: CreateLeadUseCase;
    let sendOutboundMessageUseCase: SendOutboundMessageUseCase;
    let processInboundReplyUseCase: ProcessInboundReplyUseCase;
    let generateAiReplyUseCase: GenerateAiReplyUseCase;
    let getLeadUseCase: GetLeadUseCase;

    const mockLead = { id: 'uuid', name: 'Test', contactInfo: 'test@test.com', status: 'new' } as Lead;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LeadsController],
            providers: [
                {
                    provide: CreateLeadUseCase,
                    useValue: { execute: jest.fn().mockResolvedValue(mockLead) },
                },
                {
                    provide: SendOutboundMessageUseCase,
                    useValue: { execute: jest.fn().mockResolvedValue(undefined) },
                },
                {
                    provide: ProcessInboundReplyUseCase,
                    useValue: { execute: jest.fn().mockResolvedValue(undefined) },
                },
                {
                    provide: GenerateAiReplyUseCase,
                    useValue: { execute: jest.fn().mockResolvedValue('AI Reply') },
                },
                {
                    provide: GetLeadUseCase,
                    useValue: { execute: jest.fn().mockResolvedValue(mockLead) },
                },
            ],
        }).compile();

        controller = module.get<LeadsController>(LeadsController);
        createLeadUseCase = module.get<CreateLeadUseCase>(CreateLeadUseCase);
        sendOutboundMessageUseCase = module.get<SendOutboundMessageUseCase>(SendOutboundMessageUseCase);
        processInboundReplyUseCase = module.get<ProcessInboundReplyUseCase>(ProcessInboundReplyUseCase);
        generateAiReplyUseCase = module.get<GenerateAiReplyUseCase>(GenerateAiReplyUseCase);
        getLeadUseCase = module.get<GetLeadUseCase>(GetLeadUseCase);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a lead', async () => {
            const dto: any = { name: 'Test', contactInfo: 'test@test.com', channel: 'whatsapp' };
            const result = await controller.create(dto);
            expect(result).toEqual(mockLead);
            expect(createLeadUseCase.execute).toHaveBeenCalledWith(dto.name, dto.contactInfo, dto.channel);
        });
    });

    describe('send', () => {
        it('should send a message', async () => {
            const dto = { leadId: 'uuid', message: 'Hello' };
            const result = await controller.send(dto);
            expect(result).toEqual({ status: 'queued' });
            expect(sendOutboundMessageUseCase.execute).toHaveBeenCalledWith(dto.leadId, dto.message);
        });
    });

    describe('reply', () => {
        it('should process a reply', async () => {
            const dto = { leadId: 'uuid', content: 'Yes' };
            const result = await controller.reply(dto);
            expect(result).toEqual({ status: 'processed' });
            expect(processInboundReplyUseCase.execute).toHaveBeenCalledWith(dto.leadId, dto.content);
        });
    });

    describe('aiReply', () => {
        it('should generate an AI reply', async () => {
            const dto = { leadId: 'uuid' };
            const result = await controller.aiReply(dto);
            expect(result).toEqual({ status: 'generated', reply: 'AI Reply' });
            expect(generateAiReplyUseCase.execute).toHaveBeenCalledWith(dto.leadId);
        });
    });

    describe('get', () => {
        it('should get a lead', async () => {
            const result = await controller.get('uuid');
            expect(result).toEqual(mockLead);
            expect(getLeadUseCase.execute).toHaveBeenCalledWith('uuid');
        });
    });
});

import { Test, TestingModule } from '@nestjs/testing';
import { GenerateAiReplyUseCase } from '@/leads/application/use-cases/generate-ai-reply.use-case';
import { SendOutboundMessageUseCase } from '@/leads/application/use-cases/send-outbound-message.use-case';
import { LEAD_REPOSITORY, LeadRepository } from '@/leads/domain/repositories/lead.repository';
import { OpenAiService } from '@/leads/infrastructure/services/openai.service';
import { Lead } from '@/leads/domain/entities/lead.entity';
import { Event, EventType } from '@/leads/domain/entities/event.entity';

describe('GenerateAiReplyUseCase', () => {
    let useCase: GenerateAiReplyUseCase;

    const mockLeadRepository = {
        findById: jest.fn(),
        saveEvent: jest.fn(),
    };

    const mockOpenAiService = {
        generateReply: jest.fn(),
    };

    const mockSendOutboundMessageUseCase = {
        execute: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GenerateAiReplyUseCase,
                {
                    provide: LEAD_REPOSITORY,
                    useValue: mockLeadRepository,
                },
                {
                    provide: OpenAiService,
                    useValue: mockOpenAiService,
                },
                {
                    provide: SendOutboundMessageUseCase,
                    useValue: mockSendOutboundMessageUseCase,
                },
            ],
        }).compile();

        useCase = module.get<GenerateAiReplyUseCase>(GenerateAiReplyUseCase);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should generate reply based on last inbound message', async () => {
        const leadId = 'lead-123';
        const lead = new Lead();
        lead.id = leadId;
        const event = new Event();
        event.type = EventType.INBOUND;
        event.content = 'Hello AI';
        event.timestamp = new Date();
        lead.events = [event];

        mockLeadRepository.findById.mockResolvedValue(lead);
        mockOpenAiService.generateReply.mockResolvedValue('Hello Human');
        mockSendOutboundMessageUseCase.execute.mockResolvedValue(undefined);
        mockLeadRepository.saveEvent.mockResolvedValue(true);

        const result = await useCase.execute(leadId);

        expect(result).toBe('Hello Human');
        expect(mockOpenAiService.generateReply).toHaveBeenCalledWith('Hello AI');
        expect(mockSendOutboundMessageUseCase.execute).toHaveBeenCalledWith(leadId, 'Hello Human');
    });

    it('should use fallback prompt if no inbound message', async () => {
        const leadId = 'lead-123';
        const lead = new Lead();
        lead.id = leadId;
        lead.events = [];

        mockLeadRepository.findById.mockResolvedValue(lead);
        mockOpenAiService.generateReply.mockResolvedValue('Welcome');
        mockSendOutboundMessageUseCase.execute.mockResolvedValue(undefined);

        await useCase.execute(leadId);

        expect(mockOpenAiService.generateReply).toHaveBeenCalledWith('User just signed up. Say hello.');
    });

    it('should throw error if lead not found', async () => {
        mockLeadRepository.findById.mockResolvedValue(null);
        await expect(useCase.execute('invalid')).rejects.toThrow('Lead not found');
    });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getQueueToken } from '@nestjs/bullmq';
import { SendOutboundMessageUseCase } from '@/leads/application/use-cases/send-outbound-message.use-case';
import { LEAD_REPOSITORY, LeadRepository } from '@/leads/domain/repositories/lead.repository';
import { Lead, Channel } from '@/leads/domain/entities/lead.entity';
import { EventType } from '@/leads/domain/entities/event.entity';

describe('SendOutboundMessageUseCase', () => {
    let useCase: SendOutboundMessageUseCase;

    const mockLeadRepository = {
        findById: jest.fn(),
        saveEvent: jest.fn(),
        updateStatus: jest.fn(),
    };

    const mockQueue = {
        add: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SendOutboundMessageUseCase,
                {
                    provide: LEAD_REPOSITORY,
                    useValue: mockLeadRepository,
                },
                {
                    provide: getQueueToken('message-queue'),
                    useValue: mockQueue,
                },
            ],
        }).compile();

        useCase = module.get<SendOutboundMessageUseCase>(SendOutboundMessageUseCase);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should send a message, log event, and update status', async () => {
        const leadId = 'lead-123';
        const message = 'Hello';
        const lead = new Lead();
        lead.id = leadId;
        lead.contactInfo = 'john@example.com';
        lead.channel = Channel.WHATSAPP;

        mockLeadRepository.findById.mockResolvedValue(lead);
        mockLeadRepository.saveEvent.mockResolvedValue(true);
        mockLeadRepository.updateStatus.mockResolvedValue(true);
        mockQueue.add.mockResolvedValue(true);

        await useCase.execute(leadId, message);

        expect(mockLeadRepository.saveEvent).toHaveBeenCalledWith(
            expect.objectContaining({
                type: EventType.OUTBOUND,
                content: expect.stringContaining(message),
                lead: lead,
            }),
        );

        expect(mockQueue.add).toHaveBeenCalledWith(
            'send-message',
            expect.objectContaining({
                leadId,
                contactInfo: lead.contactInfo,
                channel: lead.channel,
                message,
            }),
            expect.any(Object),
        );

        expect(mockLeadRepository.updateStatus).toHaveBeenCalledWith(leadId, 'contacted');
    });

    it('should throw error if lead not found', async () => {
        mockLeadRepository.findById.mockResolvedValue(null);

        await expect(useCase.execute('invalid-id', 'msg')).rejects.toThrow('Lead not found');
    });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ProcessInboundReplyUseCase } from '@/leads/application/use-cases/process-inbound-reply.use-case';
import { LEAD_REPOSITORY, LeadRepository } from '@/leads/domain/repositories/lead.repository';
import { Lead, LeadStatus } from '@/leads/domain/entities/lead.entity';
import { EventType } from '@/leads/domain/entities/event.entity';

describe('ProcessInboundReplyUseCase', () => {
    let useCase: ProcessInboundReplyUseCase;

    const mockLeadRepository = {
        findById: jest.fn(),
        saveEvent: jest.fn(),
        updateStatus: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProcessInboundReplyUseCase,
                {
                    provide: LEAD_REPOSITORY,
                    useValue: mockLeadRepository,
                },
            ],
        }).compile();

        useCase = module.get<ProcessInboundReplyUseCase>(ProcessInboundReplyUseCase);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should process inbound reply', async () => {
        const leadId = 'lead-123';
        const content = 'Hello back';
        const lead = new Lead();
        lead.id = leadId;

        mockLeadRepository.findById.mockResolvedValue(lead);
        mockLeadRepository.saveEvent.mockResolvedValue(true);
        mockLeadRepository.updateStatus.mockResolvedValue(true);

        await useCase.execute(leadId, content);

        expect(mockLeadRepository.saveEvent).toHaveBeenCalledWith(
            expect.objectContaining({
                type: EventType.INBOUND,
                content,
                lead,
            }),
        );

        expect(mockLeadRepository.updateStatus).toHaveBeenCalledWith(leadId, 'replied');
    });

    it('should throw error if lead not found', async () => {
        mockLeadRepository.findById.mockResolvedValue(null);
        await expect(useCase.execute('invalid', 'msg')).rejects.toThrow('Lead not found');
    });
});

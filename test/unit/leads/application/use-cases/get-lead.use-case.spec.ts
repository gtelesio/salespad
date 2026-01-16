import { Test, TestingModule } from '@nestjs/testing';
import { GetLeadUseCase } from '@/leads/application/use-cases/get-lead.use-case';
import { LEAD_REPOSITORY, LeadRepository } from '@/leads/domain/repositories/lead.repository';
import { Lead } from '@/leads/domain/entities/lead.entity';

describe('GetLeadUseCase', () => {
    let useCase: GetLeadUseCase;

    const mockLeadRepository = {
        findById: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetLeadUseCase,
                {
                    provide: LEAD_REPOSITORY,
                    useValue: mockLeadRepository,
                },
            ],
        }).compile();

        useCase = module.get<GetLeadUseCase>(GetLeadUseCase);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a lead by id', async () => {
        const lead = new Lead();
        lead.id = 'lead-123';
        mockLeadRepository.findById.mockResolvedValue(lead);

        const result = await useCase.execute('lead-123');
        expect(result).toBe(lead);
        expect(mockLeadRepository.findById).toHaveBeenCalledWith('lead-123');
    });

    it('should return null if not found', async () => {
        mockLeadRepository.findById.mockResolvedValue(null);
        const result = await useCase.execute('invalid-id');
        expect(result).toBeNull();
    });
});

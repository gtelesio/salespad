import { Test, TestingModule } from '@nestjs/testing';
import { CreateLeadUseCase } from '@/leads/application/use-cases/create-lead.use-case';
import { LEAD_REPOSITORY, LeadRepository } from '@/leads/domain/repositories/lead.repository';
import { Lead } from '@/leads/domain/entities/lead.entity';
import { Event, EventType } from '@/leads/domain/entities/event.entity';

describe('CreateLeadUseCase', () => {
    let useCase: CreateLeadUseCase;
    let leadRepository: LeadRepository;

    const mockLeadRepository = {
        save: jest.fn(),
        saveEvent: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateLeadUseCase,
                {
                    provide: LEAD_REPOSITORY,
                    useValue: mockLeadRepository,
                },
            ],
        }).compile();

        useCase = module.get<CreateLeadUseCase>(CreateLeadUseCase);
        leadRepository = module.get<LeadRepository>(LEAD_REPOSITORY);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    it('should create a lead and save an event', async () => {
        const name = 'John Doe';
        const contactInfo = 'john@example.com';
        const savedLead = new Lead();
        savedLead.id = 'lead-123';
        savedLead.name = name;
        savedLead.contactInfo = contactInfo;
        savedLead.createdAt = new Date();

        mockLeadRepository.save.mockResolvedValue(savedLead);
        mockLeadRepository.saveEvent.mockResolvedValue(new Event());

        const result = await useCase.execute(name, contactInfo);

        expect(result).toBe(savedLead);
        expect(mockLeadRepository.save).toHaveBeenCalledWith(
            expect.objectContaining({
                name,
                contactInfo,
            }),
        );
        expect(mockLeadRepository.saveEvent).toHaveBeenCalledWith(
            expect.objectContaining({
                type: EventType.CREATED,
                content: 'Lead created',
                lead: savedLead,
            }),
        );
    });
});

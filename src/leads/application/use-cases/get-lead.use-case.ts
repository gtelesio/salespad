import { Injectable } from '@nestjs/common';
import type { Lead } from '@/leads/domain/entities/lead.entity';
import { LeadRepository } from '@/leads/domain/repositories/lead.repository';

@Injectable()
export class GetLeadUseCase {
  constructor(private readonly leadRepository: LeadRepository) { }

  async execute(id: string): Promise<Lead | null> {
    return this.leadRepository.findById(id);
  }
}

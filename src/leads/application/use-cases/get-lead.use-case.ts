import { Injectable } from '@nestjs/common';
import type { Lead } from '../../domain/entities/lead.entity';
import type { LeadRepository } from '../../domain/repositories/lead.repository';

@Injectable()
export class GetLeadUseCase {
  constructor(private readonly leadRepository: LeadRepository) {}

  async execute(id: string): Promise<Lead | null> {
    return this.leadRepository.findById(id);
  }
}

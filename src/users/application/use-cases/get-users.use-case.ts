import { Injectable } from '@nestjs/common';
import type { User } from '@/users/domain/entities/user.entity';
import { UserRepository } from '@/users/domain/repositories/user.repository';

@Injectable()
export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}

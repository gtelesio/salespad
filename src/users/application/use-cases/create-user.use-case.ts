import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../domain/entities/user.entity';
import type { UserRepository } from '../../domain/repositories/user.repository';
import type { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const user = new User(uuidv4(), dto.name, dto.email, new Date());
    return this.userRepository.save(user);
  }
}

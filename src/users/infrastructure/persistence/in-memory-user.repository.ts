import { Injectable } from '@nestjs/common';
import type { User } from '../../domain/entities/user.entity';
import type { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = [];

  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}

import { Injectable } from '@nestjs/common';
import type { User } from '@/users/domain/entities/user.entity';
import type { UserRepository } from '@/users/domain/repositories/user.repository';

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

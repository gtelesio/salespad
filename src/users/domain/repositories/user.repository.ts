import type { User } from '@/users/domain/entities/user.entity';

export abstract class UserRepository {
  abstract save(user: User): Promise<User>;
  abstract findAll(): Promise<User[]>;
  // abstract findById(id: string): Promise<User | null>;
}

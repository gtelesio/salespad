import type { User } from '../../domain/entities/user.entity';
import type { UserRepository } from '../../domain/repositories/user.repository';
export declare class InMemoryUserRepository implements UserRepository {
    private readonly users;
    save(user: User): Promise<User>;
    findAll(): Promise<User[]>;
}

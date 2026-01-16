import type { User } from '../entities/user.entity';
export declare abstract class UserRepository {
    abstract save(user: User): Promise<User>;
    abstract findAll(): Promise<User[]>;
}

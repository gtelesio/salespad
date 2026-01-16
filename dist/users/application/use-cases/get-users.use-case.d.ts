import type { User } from '../../domain/entities/user.entity';
import type { UserRepository } from '../../domain/repositories/user.repository';
export declare class GetUsersUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(): Promise<User[]>;
}

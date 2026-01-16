import { User } from '../../domain/entities/user.entity';
import type { UserRepository } from '../../domain/repositories/user.repository';
import type { CreateUserDto } from '../dtos/create-user.dto';
export declare class CreateUserUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(dto: CreateUserDto): Promise<User>;
}

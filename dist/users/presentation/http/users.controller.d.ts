import type { CreateUserDto } from '../../application/dtos/create-user.dto';
import type { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import type { GetUsersUseCase } from '../../application/use-cases/get-users.use-case';
import type { User } from '../../domain/entities/user.entity';
export declare class UsersController {
    private readonly createUserUseCase;
    private readonly getUsersUseCase;
    constructor(createUserUseCase: CreateUserUseCase, getUsersUseCase: GetUsersUseCase);
    create(dto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
}

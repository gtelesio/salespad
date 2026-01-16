import { Body, Controller, Get, Post } from '@nestjs/common';
import type { CreateUserDto } from '../../application/dtos/create-user.dto';
import type { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import type { GetUsersUseCase } from '../../application/use-cases/get-users.use-case';
import type { User } from '../../domain/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUsersUseCase: GetUsersUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return this.createUserUseCase.execute(dto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.getUsersUseCase.execute();
  }
}

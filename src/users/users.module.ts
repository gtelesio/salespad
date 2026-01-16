import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { GetUsersUseCase } from './application/use-cases/get-users.use-case';
import { UserRepository } from './domain/repositories/user.repository';
import { InMemoryUserRepository } from './infrastructure/persistence/in-memory-user.repository';
import { UsersController } from './presentation/http/users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    GetUsersUseCase,
    {
      provide: UserRepository,
      useClass: InMemoryUserRepository,
    },
  ],
  exports: [],
})
export class UsersModule {}

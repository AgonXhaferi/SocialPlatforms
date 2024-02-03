import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHttpController } from '@modules/user/interface/adapters/http/create-user.http.controller';
import { CreateUserCommandHandler } from '@modules/user/application/commands/create-user/create-user.command-handler';
import { CreateUserService } from '@modules/user/application/services/create-user.service';
import { USER_REPOSITORY } from '@modules/user/user.di-tokens';
import { UserRepositoryAdapter } from '@modules/user/infrastructure/adapter/user.repository.adapter';
import { UserMapper } from '@modules/user/mapper/user.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPersistenceEntity } from '@modules/user/database/entities/user.persistence.entity';

const httpControllers = [CreateUserHttpController];

const commandHandlers: Provider[] = [CreateUserCommandHandler];
const services: Provider[] = [CreateUserService];

const mappers: Provider[] = [UserMapper];

const repositories: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepositoryAdapter,
  },
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserPersistenceEntity])],
  controllers: [...httpControllers],
  providers: [...commandHandlers, ...services, ...repositories, ...mappers],
})
export class UserModule {}

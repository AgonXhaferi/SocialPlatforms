import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHttpController } from '@modules/user/interface/adapters/http/create-user.http.controller';
import { CreateUserCommandHandler } from '@modules/user/commands/create-user/create-user.command-handler';
import { CreateUserService } from '@modules/user/services/create-user.service';
import { USER_REPOSITORY } from '@modules/user/user.di-tokens';

const httpControllers = [CreateUserHttpController];

const commandHandlers: Provider[] = [CreateUserCommandHandler];
const services: Provider[] = [CreateUserService];

const repositories: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
];

@Module({
  imports: [CqrsModule],
  controllers: [...httpControllers],
  providers: [...commandHandlers, ...services],
})
export class UserModule {}

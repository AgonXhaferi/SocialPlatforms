import { CreateUserCommand } from '@modules/user/application/commands/create-user/create-user.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { ExceptionBase } from '@libs/exceptions';
import { CreateUserService } from '@modules/user/application/services/create-user.service';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler {
  constructor(protected readonly createUserService: CreateUserService) {}

  async execute(
    command: CreateUserCommand,
  ): Promise<Result<AggregateID, ExceptionBase>> {
    return this.createUserService.createUser(command);
  }
}

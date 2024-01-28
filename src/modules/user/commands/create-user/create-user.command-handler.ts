import { CreateUserCommand } from '@modules/user/commands/create-user/create-user.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { ExceptionBase } from '@libs/exceptions';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler {
  execute(
    command: CreateUserCommand,
  ): Promise<Result<AggregateID, ExceptionBase>> {
    throw new Error('Method not implemented.');
  }
}

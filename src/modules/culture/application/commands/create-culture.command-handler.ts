import { CreateUserCommand } from '@modules/user/application/commands/create-user/create-user.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { ExceptionBase } from '@libs/exceptions';
import { CreateCultureCommand } from '@modules/culture/application/commands/create-culture.command';

@CommandHandler(CreateCultureCommand)
export class CreateCultureCommandHandler implements ICommandHandler {
  constructor() {}

  async execute(
    command: CreateUserCommand,
  ): Promise<Result<AggregateID, ExceptionBase>> {}
}

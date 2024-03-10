import { CreateUserCommand } from '@modules/user/application/commands/create-user/create-user.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { ExceptionBase } from '@libs/exceptions';
import { CreateCultureCommand } from '@modules/culture/application/commands/create-culture.command';
import { CreateCultureService } from '@modules/culture/application/services/culture/create-culture.service';

@CommandHandler(CreateCultureCommand)
export class CreateCultureCommandHandler implements ICommandHandler {
  constructor(private readonly createCultureService: CreateCultureService) {}

  async execute(
    command: CreateCultureCommand,
  ): Promise<Result<AggregateID, ExceptionBase>> {
    return this.createCultureService.createCulture(command);
  }
}

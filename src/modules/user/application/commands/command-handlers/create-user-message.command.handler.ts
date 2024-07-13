import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserMessageCommand } from '@modules/user/application/commands/create-user-message.command';
import { Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { ExceptionBase } from '@libs/exceptions';
import { CreateUserMessageService } from '@modules/user/application/services/create-user-message.service';

@CommandHandler(CreateUserMessageCommand)
export class CreateUserMessageCommandHandler implements ICommandHandler {
  constructor(private createUserMessageService: CreateUserMessageService) {}

  execute(
    command: CreateUserMessageCommand,
  ): Promise<Result<AggregateID, ExceptionBase>> {
    return this.createUserMessageService.createUserMessage(command);
  }
}

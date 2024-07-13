import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserChatCommand } from '@modules/user/application/commands/create-user-chat.command';
import { CreateUserChatService } from '@modules/user/application/services/create-user-chat.service';
import { AggregateID } from '@libs/ddd';
import { ExceptionBase } from '@libs/exceptions';
import { Result } from 'oxide.ts';

@CommandHandler(CreateUserChatCommand)
export class CreateUserChatCommandHandler implements ICommandHandler {
  constructor(private createUserChatService: CreateUserChatService) {}

  execute(
    command: CreateUserChatCommand,
  ): Promise<Result<AggregateID, ExceptionBase>> {
    return this.createUserChatService.createUserChat(command);
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateChatCommand } from '@modules/user/application/commands/create-chat.command';

@CommandHandler(CreateChatCommand)
export class CreateChatCommandHandler implements ICommandHandler {
  execute(command: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

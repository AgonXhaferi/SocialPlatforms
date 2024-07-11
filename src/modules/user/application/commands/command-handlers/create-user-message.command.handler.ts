import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserMessageCommand } from '@modules/user/application/commands/create-user-message.command';

@CommandHandler(CreateUserMessageCommand)
export class CreateUserMessageCommandHandler implements ICommandHandler {
  execute(command: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

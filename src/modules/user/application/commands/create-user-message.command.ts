import { Command, CommandProps } from '@libs/ddd';

export class CreateUserMessageCommand extends Command {
  senderId: string;
  content: string;
  chatId: string;
  timestamp: Date;

  constructor(props: CommandProps<CreateUserMessageCommand>) {
    super(props);
    this.content = props.content;
    this.senderId = props.senderId;
    this.chatId = props.chatId;
  }
}

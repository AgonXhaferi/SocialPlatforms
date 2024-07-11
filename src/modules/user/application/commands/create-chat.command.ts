import { Command, CommandProps } from '@libs/ddd';

export class CreateChatCommand extends Command {
  readonly userOneId: string;
  readonly userTwoId: string;

  constructor(props: CommandProps<CreateChatCommand>) {
    super(props);
    this.userOneId = props.userOneId;
    this.userTwoId = props.userTwoId;
  }
}

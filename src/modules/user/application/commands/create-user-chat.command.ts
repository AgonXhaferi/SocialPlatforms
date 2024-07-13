import { Command, CommandProps } from '@libs/ddd';

export class CreateUserChatCommand extends Command {
  readonly userOneId: string;
  readonly userTwoId: string;

  constructor(props: CommandProps<CreateUserChatCommand>) {
    super(props);
    this.userOneId = props.userOneId;
    this.userTwoId = props.userTwoId;
  }
}

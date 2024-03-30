import { Command, CommandProps } from '@libs/ddd';

export class CreateUserFollowingCommand extends Command {
  readonly followeeId: string;
  readonly followerId: string;

  constructor(props: CommandProps<CreateUserFollowingCommand>) {
    super(props);
    this.followeeId = props.followeeId;
    this.followerId = props.followerId;
  }
}

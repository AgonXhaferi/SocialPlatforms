import { Command, CommandProps } from '@libs/ddd';

export class CreateCultureSubscriptionCommand extends Command {
  readonly userId: string;
  readonly cultureId: string;
  readonly isPrimary: boolean;

  constructor(props: CommandProps<CreateCultureSubscriptionCommand>) {
    super(props);
    this.userId = props.userId;
    this.cultureId = props.cultureId;
    this.isPrimary = props.isPrimary;
  }
}

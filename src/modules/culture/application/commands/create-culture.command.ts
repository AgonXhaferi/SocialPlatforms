import { Command, CommandProps } from '@libs/ddd';

export class CreateCultureCommand extends Command {
  readonly name: string;
  readonly location: string;
  readonly language: string;

  constructor(props: CommandProps<CreateCultureCommand>) {
    super(props);
    this.name = props.name;
    this.location = props.location;
    this.language = props.language;
  }
}

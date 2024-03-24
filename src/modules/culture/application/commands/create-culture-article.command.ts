import { Command, CommandProps } from '@libs/ddd';

export class CreateCultureArticleCommand extends Command {
  readonly title: string;
  readonly content: string;

  constructor(props: CommandProps<CreateCultureArticleCommand>) {
    super(props);
    this.title = props.title;
    this.content = props.content;
  }
}

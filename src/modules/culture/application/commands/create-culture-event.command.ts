import { Command, CommandProps } from '@libs/ddd';

export class CreateCultureEventCommand extends Command {
  readonly name: string;
  readonly description: string;
  readonly longitude: number;
  readonly latitude: number;
  readonly startDate: Date;
  readonly endDate: Date;

  constructor(props: CommandProps<CreateCultureEventCommand>) {
    super(props);
    this.name = props.name;
    this.description = props.description;
    this.longitude = props.longitude;
    this.latitude = props.latitude;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
  }
}

import { Command, CommandProps } from '@libs/ddd';

export class CreateUserCommand extends Command {
  readonly id: string;
  readonly email: string;
  readonly country: string;
  readonly culture: string;
  readonly postalCode: string;
  readonly street: string;
  readonly name: string;
  readonly lastName: string;
  readonly userName: string;
  readonly age: number;

  constructor(props: CommandProps<CreateUserCommand>) {
    super(props);
    this.email = props.email;
    this.country = props.country;
    this.culture = props.culture;
    this.postalCode = props.postalCode;
    this.street = props.street;
    this.age = props.age;
    this.userName = props.userName;
    this.name = props.name;
    this.lastName = props.lastName;
    this.id = props.id;
  }
}

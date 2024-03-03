import { ValueObject } from '@libs/ddd';
import { Guard } from '@libs/guard';
import { ArgumentOutOfRangeException } from '@libs/exceptions';

export interface FullNameProps {
  firstName: string;
  lastName: string;
}

export class FullName extends ValueObject<FullNameProps> {
  get firstName() {
    return this.props.firstName;
  }

  get lastName() {
    return this.props.lastName;
  }

  protected validate(props: FullNameProps): void {
    if (!Guard.lengthIsBetween(props.firstName, 1, 50)) {
      throw new ArgumentOutOfRangeException('First name is out of range.');
    }
    if (!Guard.lengthIsBetween(props.lastName, 1, 50)) {
      throw new ArgumentOutOfRangeException('Last name is out of range.');
    }
  }
}

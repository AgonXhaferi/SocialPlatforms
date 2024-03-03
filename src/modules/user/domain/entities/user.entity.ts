import { UserProps, UserRoles } from '@modules/user/domain/props/user.types';
import { AggregateID, AggregateRoot } from '@libs/ddd';
import * as crypto from 'crypto';

export class UserEntity extends AggregateRoot<UserProps> {
  protected readonly _id: AggregateID;

  static create(userProps: UserProps) {
    const id = userProps.id ?? crypto.randomUUID();

    const props: UserProps = { ...userProps, role: UserRoles.moderator };

    return new UserEntity({ id, props }); //TODO, check this out it may be overriden~ by the id value of the user props.
  }

  public validate(): void {}
}

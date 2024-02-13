import { UserProps, UserRoles } from '@modules/user/domain/props/user.types';
import { AggregateID, AggregateRoot } from '@libs/ddd';
import * as crypto from 'crypto';

export class UserEntity extends AggregateRoot<UserProps> {
  protected readonly _id: AggregateID;

  static create(userProps: UserProps) {
    const id = crypto.randomUUID();

    const props: UserProps = { ...userProps, role: UserRoles.moderator };

    return new UserEntity({ id, props });
  }

  public validate(): void {}
}

import {
  CreateUserProps,
  UserProps,
  UserRoles,
} from '@modules/user/domain/props/user.types';
import { AggregateID, AggregateRoot } from '@libs/ddd';
import * as crypto from 'crypto';

export class UserEntity extends AggregateRoot<UserProps> {
  protected readonly _id: AggregateID;

  static create(createUserProps: CreateUserProps) {
    const id = crypto.randomUUID();

    const props: UserProps = { ...createUserProps, role: UserRoles.moderator };

    return new UserEntity({ id, props });
  }

  public validate(): void {}
}

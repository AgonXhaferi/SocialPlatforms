import { AggregateRoot } from '@libs/ddd';
import { UserFollowingProps } from '@modules/user/domain/props/user-following.props';
import * as crypto from 'crypto';

export class UserFollowingEntity extends AggregateRoot<UserFollowingProps> {
  protected _id: string;

  static create(userProps: UserFollowingProps) {
    const id = crypto.randomUUID();

    const props: UserFollowingProps = { ...userProps };

    return new UserFollowingEntity({ id, props });
  }

  public validate(): void {
    //No need to validate anything here, the UUID's are being validated at interface layer.
  }
}

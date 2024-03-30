import { AggregateRoot } from '@libs/ddd';
import { UserFollowingProps } from '@modules/user/domain/props/user-following.props';
import crypto from 'crypto';

export class UserFollowingEntity extends AggregateRoot<UserFollowingProps> {
  protected _id: string;

  static create(userProps: UserFollowingProps) {
    const id = crypto.randomUUID();

    const props: UserFollowingProps = { ...userProps };

    return new UserFollowingEntity({ id, props });
  }

  public validate(): void {
    throw new Error('Method not implemented.');
  }
}

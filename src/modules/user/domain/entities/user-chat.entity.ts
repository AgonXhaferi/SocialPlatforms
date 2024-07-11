import { AggregateRoot } from '@libs/ddd';
import { UserChatProps } from '@modules/user/domain/props/user-chat.props';
import crypto from 'crypto';

export class UserChatEntity extends AggregateRoot<UserChatProps> {
  protected _id: string;

  static create(userChatProps: UserChatProps) {
    const id = crypto.randomUUID();

    return new UserChatEntity({ id, props: userChatProps });
  }

  public validate(): void {
    //TODO: Note, there isn't much validation besides checking if they're empty and that's already done for all props.
  }
}

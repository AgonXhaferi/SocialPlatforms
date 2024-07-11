import { AggregateRoot } from '@libs/ddd';
import { UserMessageProps } from '@modules/user/domain/props/user-message.props';

export class UserMessageEntity extends AggregateRoot<UserMessageProps> {
  protected _id: string;

  static create(userMessageProps: UserMessageProps): UserMessageEntity {
    const id = crypto.randomUUID();

    const props: UserMessageProps = { ...userMessageProps };

    return new UserMessageEntity({ id, props });
  }

  public validate(): void {}
}

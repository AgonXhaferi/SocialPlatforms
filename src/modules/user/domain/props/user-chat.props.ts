import { UserMessageEntity } from '@modules/user/domain/entities/user-message.entity';

export interface UserChatProps {
  userOneId: string;
  userTwoId: string;
  userMessages: UserMessageEntity[];
}

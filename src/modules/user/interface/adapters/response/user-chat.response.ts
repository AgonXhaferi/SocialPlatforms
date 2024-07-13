import { UserMessageResponse } from '@modules/user/interface/adapters/response/user-message.response';

export class UserChatResponse {
  chatId: string;
  userOneId: string;
  userTwoId: string;
  userMessages: UserMessageResponse[];

  constructor(props: UserChatResponse) {
    this.chatId = props.chatId;
    this.userOneId = props.userOneId;
    this.userTwoId = props.userTwoId;
    this.userMessages = props.userMessages;
  }
}

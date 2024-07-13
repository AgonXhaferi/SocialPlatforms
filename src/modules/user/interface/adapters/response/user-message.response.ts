export class UserMessageResponse {
  chatId: string;
  senderId: string;
  content: string;
  timestamp: Date;

  constructor(props: UserMessageResponse) {
    this.chatId = props.chatId;
    this.senderId = props.senderId;
    this.content = props.content;
    this.timestamp = props.timestamp;
  }
}

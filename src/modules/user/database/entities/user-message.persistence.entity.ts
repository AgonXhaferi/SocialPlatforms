import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserChatPersistenceEntity } from '@modules/user/database/entities/user-chat.persistence.entity';

@Entity('message', {
  schema: 'chat',
})
export class UserMessagePersistenceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'chat_id' })
  chatId: string;

  @Column({ type: 'uuid', name: 'sender_id' })
  senderId: string;

  @Column({ type: 'varchar', name: 'content' })
  content: string;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(
    () => UserChatPersistenceEntity,
    (userChat) => userChat.userMessages,
  )
  @JoinColumn({
    name: 'chat_id',
    referencedColumnName: 'id',
  })
  userChat: UserChatPersistenceEntity;

  constructor(
    chatId: string,
    senderId: string,
    content: string,
    timestamp: Date,
  ) {
    this.chatId = chatId;
    this.senderId = senderId;
    this.content = content;
    this.timestamp = timestamp;
  }
}

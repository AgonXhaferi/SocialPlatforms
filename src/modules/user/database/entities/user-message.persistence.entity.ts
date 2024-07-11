import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  constructor(chatId: string, senderId: string, content: string) {
    this.chatId = chatId;
    this.senderId = senderId;
    this.content = content;
  }
}

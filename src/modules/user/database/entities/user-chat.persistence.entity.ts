import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserMessagePersistenceEntity } from '@modules/user/database/entities/user-message.persistence.entity';

@Entity('chat', { schema: 'chat' })
export class UserChatPersistenceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', name: 'user1_id' })
  userOne: string;

  @Column({ type: 'varchar', name: 'user2_id' })
  userTwo: string;

  @CreateDateColumn({
    name: 'time_created',
  })
  timeCreated: Date;

  @OneToMany(
    () => UserMessagePersistenceEntity,
    (userMessages) => userMessages.userChat,
    {
      eager: true,
    },
  )
  userMessages: UserMessagePersistenceEntity[];

  constructor(userOne: string, userTwo: string) {
    this.userOne = userOne;
    this.userTwo = userTwo;
  }
}

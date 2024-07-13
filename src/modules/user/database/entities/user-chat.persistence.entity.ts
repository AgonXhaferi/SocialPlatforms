import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  constructor(userOne: string, userTwo: string) {
    this.userOne = userOne;
    this.userTwo = userTwo;
  }
}

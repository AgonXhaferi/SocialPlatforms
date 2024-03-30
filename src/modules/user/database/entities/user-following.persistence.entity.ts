import {
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { sha256Hash } from '@modules/shared/functions/sha256-map.function';

@Entity('user_following', {
  schema: 'user',
})
export class UserFollowingPersistenceEntity {
  @PrimaryColumn('uuid', {
    name: 'follower',
  })
  followerId: string;

  @PrimaryColumn('uuid', {
    name: 'followee',
  })
  followeeId: string;

  @CreateDateColumn({
    name: 'time_created',
  })
  timeCreated: Date;

  @UpdateDateColumn({
    name: 'time_updated',
  })
  timeUpdated: Date;

  constructor(followerId: string, followeeId: string) {
    this.followerId = followerId;
    this.followeeId = followeeId;
  }

  get id() {
    return sha256Hash({
      followerId: this.followerId,
      followeeId: this.followeeId,
    });
  }
}

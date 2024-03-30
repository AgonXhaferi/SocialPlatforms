import { AggregateID, RepositoryPort } from '@libs/ddd';
import { UserFollowingEntity } from '@modules/user/domain/entities/user-following.entity';

export interface UserFollowingRepositoryPort
  extends RepositoryPort<UserFollowingEntity, AggregateID> {}

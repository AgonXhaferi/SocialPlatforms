import { AggregateID, RepositoryPort } from '@libs/ddd';
import { UserFollowingEntity } from '@modules/user/domain/entities/user-following.entity';
import { AreUsersFollowersDto } from '@modules/user/infrastructure/dto/are-users-followers.dto';

export interface UserFollowingRepositoryPort
  extends RepositoryPort<UserFollowingEntity, AggregateID> {
  isThereUserFollowing(
    areUsersFollowersDto: AreUsersFollowersDto,
  ): Promise<boolean>;
}

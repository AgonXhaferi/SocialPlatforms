import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAreUsersFollowersQuery } from '@modules/user/application/query/queries/find-are-users-followers.query';
import { Inject } from '@nestjs/common';
import { USER_FOLLOWING_REPOSITORY } from '@modules/user/user.di-tokens';
import { UserFollowingRepositoryPort } from '@modules/user/application/ports/user-following.repository.port';

@QueryHandler(FindAreUsersFollowersQuery)
export class FindAreUsersFollowersQueryHandler
  implements IQueryHandler<FindAreUsersFollowersQuery>
{
  constructor(
    @Inject(USER_FOLLOWING_REPOSITORY)
    private readonly port: UserFollowingRepositoryPort,
  ) {}

  async execute(query: FindAreUsersFollowersQuery): Promise<boolean> {
    return await this.port.isThereUserFollowing({
      followerId: query.followerId,
      followeeId: query.followeeId,
    });
  }
}

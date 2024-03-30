import { Inject, Injectable } from '@nestjs/common';
import { USER_FOLLOWING_REPOSITORY } from '@modules/user/user.di-tokens';
import { UserFollowingRepositoryPort } from '@modules/user/application/ports/user-following.repository.port';
import { CreateUserFollowingCommand } from '@modules/user/application/commands/create-user-following/create-user-following.command';
import { UserFollowingEntity } from '@modules/user/domain/entities/user-following.entity';
import { Err, Ok, Result } from 'oxide.ts';
import { ConflictException, ExceptionBase } from '@libs/exceptions';
import { UserAlreadyExistsError } from '@modules/user/domain/errors/user-already-exists.error';
import { AggregateID } from '@libs/ddd';

@Injectable()
export class CreateUserFollowingService {
  constructor(
    @Inject(USER_FOLLOWING_REPOSITORY)
    protected readonly userRepo: UserFollowingRepositoryPort,
  ) {}

  async createUserFollowing(
    createUserFollowingDto: CreateUserFollowingCommand,
  ): Promise<Result<AggregateID, ExceptionBase>> {
    const userFollowingEntity = UserFollowingEntity.create({
      followerId: createUserFollowingDto.followerId,
      followeeId: createUserFollowingDto.followeeId,
    });

    try {
      const userFollowingId = await this.userRepo.create(userFollowingEntity);

      return Ok(userFollowingId);
    } catch (error) {
      if (error instanceof ConflictException) {
        return Err(new UserAlreadyExistsError(error)); //Change this to another appropriate error for this use case.
      }
      throw error;
    }
  }
}

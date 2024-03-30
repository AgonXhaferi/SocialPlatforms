import { Injectable } from '@nestjs/common';
import { Mapper } from '@libs/ddd';
import { UserFollowingEntity } from '@modules/user/domain/entities/user-following.entity';
import { UserFollowingPersistenceEntity } from '@modules/user/database/entities/user-following.persistence.entity';

@Injectable()
export class UserFollowingMapper
  implements Mapper<UserFollowingEntity, UserFollowingPersistenceEntity>
{
  toPersistence(entity: UserFollowingEntity): UserFollowingPersistenceEntity {
    const record = entity.getProps();

    return new UserFollowingPersistenceEntity(
      record.followerId,
      record.followeeId,
    );
  }

  toDomain(record: UserFollowingPersistenceEntity): UserFollowingEntity {
    return new UserFollowingEntity({
      id: record.id,
      createdAt: record.timeCreated,
      updatedAt: record.timeUpdated,
      props: {
        followerId: record.followerId,
        followeeId: record.followeeId,
      },
    });
  }

  toResponse(entity: UserFollowingEntity) {
    throw new Error('Method not implemented.');
  }
}

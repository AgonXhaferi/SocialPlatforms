import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserFollowingPersistenceEntity } from '@modules/user/database/entities/user-following.persistence.entity';
import { UserFollowingMapper } from '@modules/user/mapper/user-following.mapper';
import { UserFollowingRepositoryPort } from '@modules/user/application/ports/user-following.repository.port';
import { Paginated, PaginatedQueryParams } from '@src/libs/ddd';
import { UserFollowingEntity } from '../../domain/entities/user-following.entity';
import { AreUsersFollowersDto } from '../dto/are-users-followers.dto';

@Injectable()
export class UserFollowingRepositoryAdapter
  implements UserFollowingRepositoryPort
{
  constructor(
    @InjectRepository(UserFollowingPersistenceEntity)
    private readonly repository: Repository<UserFollowingPersistenceEntity>,
    private readonly mapper: UserFollowingMapper,
  ) {}

  async isThereUserFollowing(
    areUsersFollowersDto: AreUsersFollowersDto,
  ): Promise<boolean> {
    const areUsersFollowers = await this.repository.findOneBy({
      followerId: areUsersFollowersDto.followerId,
      followeeId: areUsersFollowersDto.followeeId,
    });

    return !!areUsersFollowers;
  }

  async create(entity: UserFollowingEntity): Promise<string> {
    const userFollowingPersistenceEntity = this.mapper.toPersistence(entity);
    const newUserFollowingPersistenceEntity = await this.repository.save(
      userFollowingPersistenceEntity,
    );

    return newUserFollowingPersistenceEntity.id;
  }

  createMany(entity: UserFollowingEntity[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findOneById(id: string): Promise<UserFollowingEntity> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<UserFollowingEntity[]> {
    throw new Error('Method not implemented.');
  }

  findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<UserFollowingEntity>> {
    throw new Error('Method not implemented.');
  }

  delete(entity: UserFollowingEntity): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
}

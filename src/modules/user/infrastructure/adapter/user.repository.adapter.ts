import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '@modules/user/application/ports/user.repository.port';
import { Paginated, PaginatedQueryParams } from '@src/libs/ddd';
import { UserEntity } from '../../domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPersistenceEntity } from '@modules/user/database/entities/user.persistence.entity';
import { In, Repository } from 'typeorm';
import { UserMapper } from '@modules/user/mapper/user.mapper';

@Injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserPersistenceEntity)
    private readonly repository: Repository<UserPersistenceEntity>,
    private readonly userMapper: UserMapper,
  ) {}

  async findUsersByIds(userIds: string[]): Promise<UserEntity[]> {
    const persistenceUsers = await this.repository.findBy({
      id: In(userIds),
    });

    return persistenceUsers.map((persistenceUser) =>
      this.userMapper.toDomain(persistenceUser),
    );
  }

  async create(entity: UserEntity): Promise<string> {
    const persistenceEntity = this.userMapper.toPersistence(entity);

    const newUser = await this.repository.save(persistenceEntity);

    return newUser.id;
  }

  createMany(entity: UserEntity[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findOneById(id: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }

  findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<UserEntity>> {
    throw new Error('Method not implemented.');
  }

  delete(entity: UserEntity): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
}

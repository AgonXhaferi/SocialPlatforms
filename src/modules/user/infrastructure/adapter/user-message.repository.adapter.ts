import { UserMessageRepositoryPort } from '@modules/user/application/ports/user-message.repository.port';
import { UserMessagePersistenceEntity } from '@modules/user/database/entities/user-message.persistence.entity';
import { AggregateID, Paginated, PaginatedQueryParams } from '@libs/ddd';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMessageMapper } from '@modules/user/mapper/user-message.mapper';
import { UserMessageEntity } from '../../domain/entities/user-message.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMessageRepositoryAdapter implements UserMessageRepositoryPort {
  constructor(
    @InjectRepository(UserMessagePersistenceEntity)
    private readonly repository: Repository<UserMessagePersistenceEntity>,
    private readonly mapper: UserMessageMapper,
  ) {}

  async create(entity: UserMessageEntity): Promise<AggregateID> {
    const userMessagePersistenceEntity = this.mapper.toPersistence(entity);

    const newUserMessagePersistenceRecord = await this.repository.save(
      userMessagePersistenceEntity,
    );

    return newUserMessagePersistenceRecord.id;
  }

  createMany(entity: UserMessageEntity[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findOneById(id: string): Promise<UserMessageEntity> {
    const persistenceEntity = await this.repository.findOneBy({
      id,
    });

    return this.mapper.toDomain(persistenceEntity);
  }

  async findAll(): Promise<UserMessageEntity[]> {
    const persistenceEntities = await this.repository.find();

    return persistenceEntities.map((persistenceEntity) =>
      this.mapper.toDomain(persistenceEntity),
    );
  }

  async findByShipmentId(id: string): Promise<UserMessageEntity[]> {
    const persistenceEntities = await this.repository.findBy({
      chatId: id,
    });

    return persistenceEntities.map(this.mapper.toDomain);
  }

  findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<UserMessageEntity>> {
    throw new Error('Method not implemented.');
  }

  delete(entity: UserMessageEntity): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
}

import { Injectable } from '@nestjs/common';
import { CultureEventsRepositoryPort } from '@modules/culture/application/ports/culture-events.repository.port';
import { Paginated, PaginatedQueryParams } from '@src/libs/ddd';
import { CultureEventsEntity } from '../../domain/entities/culture-events.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CulturePersistenceEntity } from '@modules/culture/database/entities/culture.persistence.entity';
import { Repository } from 'typeorm';
import { CultureEventsPersistenceEntity } from '@modules/culture/database/entities/culture-events.persistence.entity';
import { CultureEventMapper } from '@modules/culture/mapper/culture-event.mapper';

@Injectable()
export class CultureEventRepositoryAdapter
  implements CultureEventsRepositoryPort
{
  constructor(
    @InjectRepository(CultureEventsPersistenceEntity)
    private readonly repository: Repository<CultureEventsPersistenceEntity>,
    private readonly cultureEventsMapper: CultureEventMapper,
  ) {}

  async create(entity: CultureEventsEntity): Promise<string> {
    const persistenceEntity = this.cultureEventsMapper.toPersistence(entity);

    try {
      const newCultureEventsEntity =
        await this.repository.save(persistenceEntity);

      return newCultureEventsEntity.id;
    } catch (error) {
      throw error; //TODO, obviously do better error handling, at least define some logging for this.
    }
  }

  createMany(entity: CultureEventsEntity[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findOneById(id: string): Promise<CultureEventsEntity> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<CultureEventsEntity[]> {
    throw new Error('Method not implemented.');
  }

  findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<CultureEventsEntity>> {
    throw new Error('Method not implemented.');
  }

  delete(entity: CultureEventsEntity): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
}

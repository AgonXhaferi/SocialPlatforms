import { Injectable } from '@nestjs/common';
import { CultureSubscriptionsRepositoryPort } from '@modules/culture/application/ports/culture-subscriptions.repository.port';
import { Paginated, PaginatedQueryParams } from '@src/libs/ddd';
import { CultureSubscriptionsEntity } from '../../domain/entities/culture-subscriptions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CultureSubscriptionsPersistenceEntity } from '@modules/culture/database/entities/culture-subscriptions.persistence.entity';
import { CultureSubscriptionsMapper } from '@modules/culture/mapper/culture-subscriptions.mapper';
import { ArgumentInvalidException, NotFoundException } from '@libs/exceptions';

@Injectable()
export class CultureSubscriptionsRepositoryAdapter
  implements CultureSubscriptionsRepositoryPort
{
  constructor(
    @InjectRepository(CultureSubscriptionsPersistenceEntity)
    private readonly repository: Repository<CultureSubscriptionsPersistenceEntity>,
    private readonly cultureSubscriptionsMapper: CultureSubscriptionsMapper,
  ) {}

  async create(entity: CultureSubscriptionsEntity): Promise<string> {
    const cultureSubscriptionsEntity =
      this.cultureSubscriptionsMapper.toPersistence(entity);

    try {
      const newCultureSubscriptionEntity = await this.repository.save(
        cultureSubscriptionsEntity,
      );

      return newCultureSubscriptionEntity.getId();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ArgumentInvalidException(
          `Culture with ${entity.getProps().cultureId} does not exist.`,
        );
      }
    }
  }

  async createMany(entity: CultureSubscriptionsEntity[]): Promise<void> {
    const cultureSubscriptionEntities = entity.map(
      this.cultureSubscriptionsMapper.toPersistence,
    );

    await this.repository.save(cultureSubscriptionEntities);
  }

  async findOneById(id: string): Promise<CultureSubscriptionsEntity> {
    const cultureSubscriptionEntity = await this.repository.findOneBy({
      cultureId: id,
    });

    if (!cultureSubscriptionEntity) {
      throw new NotFoundException();
    }

    return this.cultureSubscriptionsMapper.toDomain(cultureSubscriptionEntity);
  }

  async findAll(): Promise<CultureSubscriptionsEntity[]> {
    const fetchedCultureSubscriptionEntities = await this.repository.find();

    return fetchedCultureSubscriptionEntities.map(
      this.cultureSubscriptionsMapper.toDomain,
    );
  }

  findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<CultureSubscriptionsEntity>> {
    throw new Error('Method not implemented.');
  }

  delete(entity: CultureSubscriptionsEntity): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }

  //TODO: Define functions for filtering users/cultures/isPrimary
}

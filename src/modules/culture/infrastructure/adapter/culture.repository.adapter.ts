import { CultureRepositoryPort } from '@modules/culture/application/ports/culture.repository.port';
import { Paginated, PaginatedQueryParams } from '@src/libs/ddd';
import { Option } from 'oxide.ts';
import { CultureEntity } from '../../domain/entities/culture.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CulturePersistenceEntity } from '@modules/culture/database/entities/culture.persistence.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CultureMapper } from '@modules/culture/mapper/culture.mapper';
import { CultureDoesntExistsError } from '@modules/culture/domain/error/culture-doesnt-exists.error';

@Injectable()
export class CultureRepositoryAdapter implements CultureRepositoryPort {
  constructor(
    @InjectRepository(CulturePersistenceEntity)
    private readonly repository: Repository<CulturePersistenceEntity>,
    private readonly cultureMapper: CultureMapper,
  ) {}

  async create(entity: CultureEntity): Promise<string> {
    const culturePersistenceEntity = this.cultureMapper.toPersistence(entity);

    try {
      const newCulture = await this.repository.save(culturePersistenceEntity);
      return newCulture.name;
    } catch (error) {
      throw new CultureDoesntExistsError();
    }
  }

  async createMany(entity: CultureEntity[]): Promise<void> {
    const culturePersistenceEntities = entity.map(
      this.cultureMapper.toPersistence,
    );

    try {
      await this.repository.save(culturePersistenceEntities);
    } catch (error) {
      throw error; //TODO: Agon, Don't do this.
    }
  }

  async findOneById(id: string): Promise<CultureEntity> {
    const culture = await this.repository.findOneBy({
      name: id,
    });

    if (!culture) {
      throw new BadRequestException('Entity not found'); //TODO: Use more verbose error type
    }
    return this.cultureMapper.toDomain(culture);
  }

  async findAll(): Promise<CultureEntity[]> {
    const cultureEntities = await this.repository.find();

    return cultureEntities.map(this.cultureMapper.toDomain);
  }

  findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<CultureEntity>> {
    throw new Error('Method not implemented.');
  }

  delete(entity: CultureEntity): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
}

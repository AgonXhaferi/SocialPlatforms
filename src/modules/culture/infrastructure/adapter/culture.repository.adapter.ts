import { CultureRepositoryPort } from '@modules/culture/application/ports/culture.repository.port';
import { Paginated, PaginatedQueryParams } from '@src/libs/ddd';
import { CultureEntity } from '../../domain/entities/culture.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { CulturePersistenceEntity } from '@modules/culture/database/entities/culture.persistence.entity';
import { Injectable } from '@nestjs/common';
import { CultureMapper } from '@modules/culture/mapper/culture.mapper';
import { ConflictException, NotFoundException } from '@libs/exceptions';

@Injectable()
export class CultureRepositoryAdapter implements CultureRepositoryPort {
  constructor(
    @InjectRepository(CulturePersistenceEntity)
    private readonly repository: Repository<CulturePersistenceEntity>,
    private readonly cultureMapper: CultureMapper,
  ) {}

  async findManyById(cultureId: string): Promise<CultureEntity[]> {
    const cultures = await this.repository.find({
      where: {
        name: ILike(`%${cultureId}%`),
      },
    });

    if (cultures.length === 0) {
      throw new NotFoundException(
        `Culture with ID: [${cultureId}] doesn't exist.`,
      );
    }

    return cultures.map((culture) => this.cultureMapper.toDomain(culture));
  }

  async create(entity: CultureEntity): Promise<string> {
    const culturePersistenceEntity = this.cultureMapper.toPersistence(entity);

    try {
      const newCulture = await this.repository.save(culturePersistenceEntity);
      return newCulture.name;
    } catch (error) {
      throw new ConflictException(
        `This culture already exists: ${culturePersistenceEntity.name}`,
      );
    }
  }

  async createMany(entity: CultureEntity[]): Promise<void> {
    const culturePersistenceEntities = entity.map(
      this.cultureMapper.toPersistence,
    );

    try {
      await this.repository.save(culturePersistenceEntities);
    } catch (error) {
      throw new ConflictException(
        `This culture already exists: ${culturePersistenceEntities
          .map((entity) => entity.name)
          .join(',')}`,
      );
    }
  }

  async findOneById(id: string): Promise<CultureEntity> {
    const culture = await this.repository.findOneBy({
      name: id,
    });

    if (!culture) {
      throw new NotFoundException(`Culture with ID: [${id}] doesn't exist.`); //TODO: Use more verbose error type
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

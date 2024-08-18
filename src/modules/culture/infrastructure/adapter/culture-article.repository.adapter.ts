import { Injectable } from '@nestjs/common';
import { CultureArticlesRepositoryPort } from '@modules/culture/application/ports/culture-articles.repository.port';
import { Paginated, PaginatedQueryParams } from '@src/libs/ddd';
import { CultureArticlesEntity } from '../../domain/entities/culture-articles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CultureArticleMapper } from '@modules/culture/mapper/culture-article.mapper';
import { CultureArticlesPersistenceEntity } from '@modules/culture/database/entities/culture-articles.persistence.entity';

@Injectable()
export class CultureArticleRepositoryAdapter
  implements CultureArticlesRepositoryPort
{
  constructor(
    @InjectRepository(CultureArticlesPersistenceEntity)
    private readonly repository: Repository<CultureArticlesPersistenceEntity>,
    private readonly cultureArticleMapper: CultureArticleMapper,
  ) {}

  async findArticleByName(
    articleName: string,
    cultureName: string,
  ): Promise<CultureArticlesEntity[]> {
    const articlePersistenceEntities = await this.repository.find({
      where: {
        culture: cultureName,
        title: Like(`%${articleName}%`),
      },
    });

    return articlePersistenceEntities.map(this.cultureArticleMapper.toDomain);
  }

  async findNLatestArticles(
    numberOfArticles: number,
    cultureName: string,
  ): Promise<CultureArticlesEntity[]> {
    const topArticlePersistenceEntities = await this.repository.find({
      take: numberOfArticles,
      order: {
        timeCreated: 'DESC',
      },
      where: {
        culture: cultureName,
      },
    });

    return topArticlePersistenceEntities.map(
      this.cultureArticleMapper.toDomain,
    );
  }

  async create(entity: CultureArticlesEntity): Promise<string> {
    const persistenceEntity = this.cultureArticleMapper.toPersistence(entity);

    try {
      const newCultureArticle = await this.repository.save(persistenceEntity);

      return newCultureArticle.id;
    } catch (error) {
      throw error; //TODO, obviously do better error handling, at least define some logging for this.
    }
  }

  createMany(entity: CultureArticlesEntity[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findOneById(id: string): Promise<CultureArticlesEntity> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<CultureArticlesEntity[]> {
    throw new Error('Method not implemented.');
  }

  findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<CultureArticlesEntity>> {
    throw new Error('Method not implemented.');
  }

  delete(entity: CultureArticlesEntity): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
}

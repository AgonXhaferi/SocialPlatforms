import { AggregateID, RepositoryPort } from '@libs/ddd';
import { CultureArticlesEntity } from '@modules/culture/domain/entities/culture-articles.entity';

export interface CultureArticlesRepositoryPort
  extends RepositoryPort<CultureArticlesEntity, AggregateID> {
  findNLatestArticles(
    numberOfArticles: number,
  ): Promise<CultureArticlesEntity[]>;
}

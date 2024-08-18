import { AggregateID, RepositoryPort } from '@libs/ddd';
import { CultureArticlesEntity } from '@modules/culture/domain/entities/culture-articles.entity';

export interface CultureArticlesRepositoryPort
  extends RepositoryPort<CultureArticlesEntity, AggregateID> {
  findNLatestArticles(
    numberOfArticles: number,
    cultureName: string, //TODO: make a DTO for this to improve readibility and conciseness.
  ): Promise<CultureArticlesEntity[]>;

  findArticleByName(
    articleName: string,
    cultureName: string,
  ): Promise<CultureArticlesEntity[]>;
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CULTURE_ARTICLES_REPOSITORY } from '@modules/culture/culture.di-tokens';
import { FindLatestCultureArticlesQuery } from '@modules/culture/application/queries/find-latest-culture-articles.query';
import { CultureArticlesRepositoryPort } from '@modules/culture/application/ports/culture-articles.repository.port';
import { CultureArticleMapper } from '@modules/culture/mapper/culture-article.mapper';
import { CultureArticleResponse } from '@modules/culture/interface/response/culture-article.response';

@QueryHandler(FindLatestCultureArticlesQuery)
export class FindLatestCultureArticlesQueryHandler implements IQueryHandler {
  constructor(
    @Inject(CULTURE_ARTICLES_REPOSITORY)
    private readonly cultureArticlesRepositoryPort: CultureArticlesRepositoryPort,
    private readonly cultureArticleMapper: CultureArticleMapper,
  ) {}

  async execute(
    findLatestCultureArticlesQuery: FindLatestCultureArticlesQuery,
  ): Promise<CultureArticleResponse[]> {
    const topCultureArticles =
      await this.cultureArticlesRepositoryPort.findNLatestArticles(
        findLatestCultureArticlesQuery.numberOfArticles,
      );

    return topCultureArticles.map(this.cultureArticleMapper.toResponse);
  }
}

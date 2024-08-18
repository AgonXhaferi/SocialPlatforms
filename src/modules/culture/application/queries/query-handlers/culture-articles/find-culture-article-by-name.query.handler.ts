import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CULTURE_ARTICLES_REPOSITORY } from '@modules/culture/culture.di-tokens';
import { CultureArticlesRepositoryPort } from '@modules/culture/application/ports/culture-articles.repository.port';
import { CultureArticleMapper } from '@modules/culture/mapper/culture-article.mapper';
import { CultureArticleResponse } from '@modules/culture/interface/response/culture-article.response';
import { FindCultureArticleByNameQuery } from '@modules/culture/application/queries/culture-articles/find-culture-article-by-name.query';

@QueryHandler(FindCultureArticleByNameQuery)
export class FindCultureArticleByNameQueryHandler implements IQueryHandler {
  constructor(
    @Inject(CULTURE_ARTICLES_REPOSITORY)
    private readonly cultureArticlesRepositoryPort: CultureArticlesRepositoryPort,
    private readonly cultureArticleMapper: CultureArticleMapper,
  ) {}

  async execute(
    findCultureArticleByNameQuery: FindCultureArticleByNameQuery,
  ): Promise<CultureArticleResponse[]> {
    const topCultureArticles =
      await this.cultureArticlesRepositoryPort.findArticleByName(
        findCultureArticleByNameQuery.articleName,
        findCultureArticleByNameQuery.cultureName,
      );

    return topCultureArticles.map(this.cultureArticleMapper.toResponse);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { CULTURE_ARTICLES_REPOSITORY } from '@modules/culture/culture.di-tokens';
import { CultureArticlesRepositoryPort } from '@modules/culture/application/ports/culture-articles.repository.port';

@Injectable()
export class CreateCultureArticlesService {
  constructor(
    @Inject(CULTURE_ARTICLES_REPOSITORY)
    protected readonly cultureRepository: CultureArticlesRepositoryPort,
  ) {}
}

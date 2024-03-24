import { Inject, Injectable } from '@nestjs/common';
import { CULTURE_ARTICLES_REPOSITORY } from '@modules/culture/culture.di-tokens';
import { CultureArticlesRepositoryPort } from '@modules/culture/application/ports/culture-articles.repository.port';
import { CreateCultureArticleCommand } from '@modules/culture/application/commands/create-culture-article.command';
import { CultureArticlesEntity } from '@modules/culture/domain/entities/culture-articles.entity';
import { Err, Ok, Result } from 'oxide.ts';
import { ConflictException, ExceptionBase } from '@libs/exceptions';
import { CultureAlreadyExistsError } from '@modules/culture/domain/error/culture-already-exists.error';
import { AggregateID } from '@libs/ddd';

@Injectable()
export class CreateCultureArticlesService {
  constructor(
    @Inject(CULTURE_ARTICLES_REPOSITORY)
    protected readonly cultureRepository: CultureArticlesRepositoryPort,
  ) {}

  async createCultureArticle(
    createCultureArticleDto: CreateCultureArticleCommand,
  ): Promise<Result<AggregateID, ExceptionBase>> {
    const createCultureArticleEntity = CultureArticlesEntity.create({
      title: createCultureArticleDto.title,
      content: createCultureArticleDto.content,
      culture: createCultureArticleDto.culture,
    });

    try {
      const createdCultureArticleId = await this.cultureRepository.create(
        createCultureArticleEntity,
      );

      return Ok(createdCultureArticleId);
    } catch (error) {
      if (error instanceof ConflictException) {
        return Err(new CultureAlreadyExistsError(error)); //TODO: I'll make a generic error implementation for this.
      }
      throw error;
    }
  }
}

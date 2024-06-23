import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCultureArticleCommand } from '@modules/culture/application/commands/create-culture-article.command';
import { Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { ExceptionBase } from '@libs/exceptions';
import { CreateCultureArticlesService } from '@modules/culture/application/services/culture-articles/create-culture-articles.service';

@CommandHandler(CreateCultureArticleCommand)
export class CreateCultureArticleCommandHandler implements ICommandHandler {
  constructor(
    private readonly createCultureArticleService: CreateCultureArticlesService,
  ) {}

  execute(
    command: CreateCultureArticleCommand,
  ): Promise<Result<AggregateID, ExceptionBase>> {
    return this.createCultureArticleService.createCultureArticle(command);
  }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCultureQuery } from '@modules/culture/application/queries/find-culture.query';
import { Inject } from '@nestjs/common';
import { CULTURE_REPOSITORY } from '@modules/culture/culture.di-tokens';

@QueryHandler(FindCultureQuery)
export class FindCultureQueryHandler implements IQueryHandler{

  constructor(@Inject(CULTURE_REPOSITORY)) {
  }

    execute(query: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
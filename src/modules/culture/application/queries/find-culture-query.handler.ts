import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCultureQuery } from '@modules/culture/application/queries/find-culture.query';
import { Inject } from '@nestjs/common';
import { CULTURE_REPOSITORY } from '@modules/culture/culture.di-tokens';
import { CultureRepositoryPort } from '@modules/culture/application/ports/culture.repository.port';
import { Ok, Result } from 'oxide.ts';
import { CultureResponse } from '@modules/culture/interface/response/culture.response';
import { CultureMapper } from '@modules/culture/mapper/culture.mapper';

@QueryHandler(FindCultureQuery)
export class FindCultureQueryHandler implements IQueryHandler {
  constructor(
    @Inject(CULTURE_REPOSITORY)
    private readonly cultureRepository: CultureRepositoryPort,
    private readonly cultureMapper: CultureMapper,
  ) {}

  async execute(
    findCultureQueryValue: FindCultureQuery,
  ): Promise<Result<CultureResponse[], Error>> {
    const cultures = await this.cultureRepository.findManyById(
      findCultureQueryValue.cultureName, //TODO: Double check this and make sure that its okay, review implementations from different projects
    );

    return Ok(
      cultures.map((culture) => this.cultureMapper.toResponse(culture)),
    );
  }
}

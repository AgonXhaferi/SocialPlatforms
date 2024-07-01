import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCultureQuery } from '@modules/culture/application/queries/find-culture.query';
import { Inject } from '@nestjs/common';
import { CULTURE_REPOSITORY } from '@modules/culture/culture.di-tokens';
import { CultureRepositoryPort } from '@modules/culture/application/ports/culture.repository.port';
import { Err, Ok, Result } from 'oxide.ts';
import { CultureResponse } from '@modules/culture/interface/response/culture.response';
import { CultureMapper } from '@modules/culture/mapper/culture.mapper';
import { ExceptionBase, NotFoundException } from '@libs/exceptions';
import { CultureDoesntExistsError } from '@modules/culture/domain/error/culture-doesnt-exists.error';

@QueryHandler(FindCultureQuery)
export class FindCultureQueryHandler implements IQueryHandler {
  constructor(
    @Inject(CULTURE_REPOSITORY)
    private readonly cultureRepository: CultureRepositoryPort, //TODO: This is technically speaking wrong if we go strictly based off of the documentation
    //TODO: Since the data that is returned from the CultureRepositoryPort is returned in the aggregate EntityType, realistically we should really just be injecting the pure REPOSITORY type from tyeporm.
    private readonly cultureMapper: CultureMapper,
  ) {}

  async execute(
    findCultureQueryValue: FindCultureQuery,
  ): Promise<Result<CultureResponse[], ExceptionBase>> {
    try {
      const cultures = await this.cultureRepository.findManyById(
        findCultureQueryValue.cultureName,
      );

      return Ok(
        cultures.map((culture) => this.cultureMapper.toResponse(culture)),
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        return Err(new CultureDoesntExistsError(error));
      }
    }
  }
}

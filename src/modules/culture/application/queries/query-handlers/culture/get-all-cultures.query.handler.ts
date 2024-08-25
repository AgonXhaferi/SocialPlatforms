import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CULTURE_REPOSITORY } from '@modules/culture/culture.di-tokens';
import { CultureRepositoryPort } from '@modules/culture/application/ports/culture.repository.port';
import { CultureMapper } from '@modules/culture/mapper/culture.mapper';
import { Err, Ok, Result } from 'oxide.ts';
import { CultureResponse } from '@modules/culture/interface/response/culture.response';
import { ExceptionBase, NotFoundException } from '@libs/exceptions';
import { CultureDoesntExistsError } from '@modules/culture/domain/error/culture-doesnt-exists.error';
import { GetAllCulturesQuery } from '@modules/culture/application/queries/culture/get-all-cultures.query';

@QueryHandler(GetAllCulturesQuery)
export class GetAllCulturesQueryHandler implements IQueryHandler {
  constructor(
    @Inject(CULTURE_REPOSITORY)
    private readonly cultureRepository: CultureRepositoryPort, //TODO: This is technically speaking wrong if we go strictly based off of the documentation
    //TODO: Since the data that is returned from the CultureRepositoryPort is returned in the aggregate EntityType, realistically we should really just be injecting the pure REPOSITORY type from tyeporm.
    private readonly cultureMapper: CultureMapper,
  ) {}

  async execute(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAllCulturesQuery: GetAllCulturesQuery,
  ): Promise<Result<CultureResponse[], ExceptionBase>> {
    try {
      const cultures = await this.cultureRepository.findAll();

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

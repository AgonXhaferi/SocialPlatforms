import { Inject, Injectable } from '@nestjs/common';
import { CreateCultureRequest } from '@modules/culture/interface/request/create-culture.request';
import { Err, Ok, Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import {
  ArgumentInvalidException,
  ConflictException,
  ExceptionBase,
} from '@libs/exceptions';
import { CultureEntity } from '@modules/culture/domain/entities/culture.entity';
import { CULTURE_REPOSITORY } from '@modules/culture/culture.di-tokens';
import { CultureRepositoryPort } from '@modules/culture/application/ports/culture.repository.port';
import { CultureAlreadyExistsError } from '@modules/culture/domain/error/culture-already-exists.error';
import { CultureDoesntExistsError } from '@modules/culture/domain/error/culture-doesnt-exists.error';

@Injectable()
export class CreateCultureService {
  constructor(
    @Inject(CULTURE_REPOSITORY)
    protected readonly cultureRepository: CultureRepositoryPort,
  ) {}

  async createCulture(
    createCultureRequest: CreateCultureRequest,
  ): Promise<Result<AggregateID, ExceptionBase>> {
    const culture = CultureEntity.create({
      name: createCultureRequest.name,
      location: createCultureRequest.location,
      language: createCultureRequest.language,
    });

    try {
      const cultureId = await this.cultureRepository.create(culture);
      return Ok(cultureId);
    } catch (error) {
      if (error instanceof ConflictException) {
        return Err(new CultureAlreadyExistsError(error));
      }
      if (error instanceof ArgumentInvalidException) {
        return Err(new CultureDoesntExistsError(error));
      }
    }
  }
}

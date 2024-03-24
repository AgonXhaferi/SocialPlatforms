import { Inject, Injectable } from '@nestjs/common';
import { CULTURE_EVENTS_REPOSITORY } from '@modules/culture/culture.di-tokens';
import { CultureEventsRepositoryPort } from '@modules/culture/application/ports/culture-events.repository.port';
import { CreateCultureEventCommand } from '@modules/culture/application/commands/create-culture-event.command';
import { CultureEventsEntity } from '@modules/culture/domain/entities/culture-events.entity';
import { CultureEventDurationValueObject } from '@modules/culture/domain/value-object/culture-event-duration.value-object';
import { GpsLocationValueObject } from '@modules/culture/domain/value-object/gps-location.value-object';
import { Err, Ok, Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { ConflictException, ExceptionBase } from '@libs/exceptions';
import { CultureAlreadyExistsError } from '@modules/culture/domain/error/culture-already-exists.error';

@Injectable()
export class CreateCultureEventsService {
  constructor(
    @Inject(CULTURE_EVENTS_REPOSITORY)
    protected readonly cultureRepository: CultureEventsRepositoryPort,
  ) {}

  async createCultureEvent(
    createCultureEventDto: CreateCultureEventCommand,
  ): Promise<Result<AggregateID, ExceptionBase>> {
    const cultureEvent = CultureEventsEntity.create({
      duration: new CultureEventDurationValueObject({
        startDate: createCultureEventDto.startDate,
        endDate: createCultureEventDto.endDate,
      }),
      description: createCultureEventDto.description,
      location: new GpsLocationValueObject({
        longitude: createCultureEventDto.longitude,
        latitude: createCultureEventDto.latitude,
      }),
      name: createCultureEventDto.name,
      culture: createCultureEventDto.culture,
    });
    try {
      const cultureId = await this.cultureRepository.create(cultureEvent);

      return Ok(cultureId);
    } catch (error) {
      if (error instanceof ConflictException) {
        return Err(new CultureAlreadyExistsError(error)); //TODO: I'll make a generic error implementation for this.
      }
      throw error;
    }
  }
}

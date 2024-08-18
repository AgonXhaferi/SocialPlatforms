import { Injectable } from '@nestjs/common';
import { Mapper } from '@libs/ddd';
import { CultureEventsEntity } from '@modules/culture/domain/entities/culture-events.entity';
import { CultureEventsPersistenceEntity } from '@modules/culture/database/entities/culture-events.persistence.entity';
import { GpsLocationValueObject } from '@modules/culture/domain/value-object/gps-location.value-object';
import { CultureEventDurationValueObject } from '@modules/culture/domain/value-object/culture-event-duration.value-object';
import { CultureEventResponse } from '@modules/culture/interface/response/culture-event.response';

@Injectable()
export class CultureEventMapper
  implements Mapper<CultureEventsEntity, CultureEventsPersistenceEntity>
{
  toPersistence(entity: CultureEventsEntity): CultureEventsPersistenceEntity {
    const copy = entity.getProps();

    return new CultureEventsPersistenceEntity(
      copy.name,
      copy.description,
      copy.location,
      copy.culture,
      copy.duration.startDate,
      copy.duration.endDate,
    );
  }

  toDomain(record: CultureEventsPersistenceEntity): CultureEventsEntity {
    return new CultureEventsEntity({
      id: record.id,
      createdAt: record.startDate,
      updatedAt: record.timeUpdated,
      props: {
        name: record.name,
        description: record.description,
        duration: new CultureEventDurationValueObject({
          startDate: record.startDate,
          endDate: record.endDate,
        }),
        location: new GpsLocationValueObject({
          longitude: record.location.longitude,
          latitude: record.location.latitude,
        }),
        culture: record.cultureName,
      },
    });
  }

  toResponse(entity: CultureEventsEntity): CultureEventResponse {
    return new CultureEventResponse({
      id: entity.id,
      name: entity.getProps().name,
      description: entity.getProps().description,
      longitude: entity.getProps().location.longitude,
      latitude: entity.getProps().location.latitude,
      endDate: entity.getProps().createdAt,
      startDate: entity.getProps().updatedAt,
    });
  }
}

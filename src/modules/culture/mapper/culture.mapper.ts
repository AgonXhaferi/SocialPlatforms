import { Mapper } from '@libs/ddd';
import { CultureEntity } from '@modules/culture/domain/entities/culture.entity';
import { CulturePersistenceEntity } from '@modules/culture/database/entities/culture.persistence.entity';
import { Injectable } from '@nestjs/common';
import { CultureResponse } from '@modules/culture/interface/response/culture.response';

@Injectable()
export class CultureMapper
  implements Mapper<CultureEntity, CulturePersistenceEntity>
{
  toPersistence(entity: CultureEntity): CulturePersistenceEntity {
    const copy = entity.getProps();

    return new CulturePersistenceEntity(
      copy.name,
      copy.language,
      copy.location,
    );
  }

  toDomain(record: CulturePersistenceEntity): CultureEntity {
    return new CultureEntity({
      id: crypto.randomUUID(), //TODO: Agon-Research I don't know if I should duplicate name here, cause in this case its a prop and an ID.
      createdAt: record.timeCreated,
      updatedAt: record.timeUpdated,
      props: {
        language: record.language,
        location: record.location,
        name: record.name,
      },
    });
  }

  toResponse(entity: CultureEntity): CultureResponse {
    return new CultureResponse(entity.getProps().name);
  }
}

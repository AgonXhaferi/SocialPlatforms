import { Mapper } from '@libs/ddd';
import { CultureEntity } from '@modules/culture/domain/entities/culture.entity';
import { CulturePersistenceEntity } from '@modules/culture/database/entities/culture.persistence.entity';
import { Injectable } from '@nestjs/common';

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
      id: record.id,
      createdAt: record.timeCreated,
      updatedAt: record.timeUpdated,
      props: {
        name: record.name,
        language: record.language,
        location: record.location,
      },
    });
  }

  toResponse(entity: CultureEntity) {
    throw new Error('Method not implemented.');
  }
}

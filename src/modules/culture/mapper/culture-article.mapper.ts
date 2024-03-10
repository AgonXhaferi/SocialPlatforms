import { Injectable } from '@nestjs/common';
import { Mapper } from '@libs/ddd';
import { CultureArticlesEntity } from '@modules/culture/domain/entities/culture-articles.entity';
import { CultureArticlesPersistenceEntity } from '@modules/culture/database/entities/culture-articles.persistence.entity';

@Injectable()
export class CultureArticleMapper
  implements Mapper<CultureArticlesEntity, CultureArticlesPersistenceEntity>
{
  toPersistence(
    entity: CultureArticlesEntity,
  ): CultureArticlesPersistenceEntity {
    const copy = entity.getProps();

    return new CultureArticlesPersistenceEntity(copy.title, copy.content);
  }

  toDomain(record: CultureArticlesPersistenceEntity): CultureArticlesEntity {
    return new CultureArticlesEntity({
      id: record.id,
      createdAt: record.timeCreated,
      updatedAt: record.timeUpdated,
      props: {
        content: record.content,
        title: record.title,
      },
    });
  }

  toResponse(entity: CultureArticlesEntity) {
    throw new Error('Method not implemented.');
  }
}

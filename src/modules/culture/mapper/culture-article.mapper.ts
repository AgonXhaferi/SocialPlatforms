import { Injectable } from '@nestjs/common';
import { Mapper } from '@libs/ddd';
import { CultureArticlesEntity } from '@modules/culture/domain/entities/culture-articles.entity';
import { CultureArticlesPersistenceEntity } from '@modules/culture/database/entities/culture-articles.persistence.entity';
import { CultureEventResponse } from '@modules/culture/interface/response/culture-event.response';
import { CultureArticleResponse } from '@modules/culture/interface/response/culture-article.response';
import e from 'express';

@Injectable()
export class CultureArticleMapper
  implements Mapper<CultureArticlesEntity, CultureArticlesPersistenceEntity>
{
  toPersistence(
    entity: CultureArticlesEntity,
  ): CultureArticlesPersistenceEntity {
    const copy = entity.getProps();

    return new CultureArticlesPersistenceEntity(
      copy.title,
      copy.content,
      copy.culture,
    );
  }

  toDomain(record: CultureArticlesPersistenceEntity): CultureArticlesEntity {
    return new CultureArticlesEntity({
      id: record.id,
      createdAt: record.timeCreated,
      updatedAt: record.timeUpdated,
      props: {
        content: record.content,
        title: record.title,
        culture: record.culture,
      },
    });
  }

  toResponse(entity: CultureArticlesEntity): CultureArticleResponse {
    return new CultureArticleResponse({
      title: entity.getProps().title,
      content: entity.getProps().content,
      timeCreated: entity.getProps().createdAt,
    });
  }
}

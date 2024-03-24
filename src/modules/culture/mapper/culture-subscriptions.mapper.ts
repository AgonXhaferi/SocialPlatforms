import { Mapper } from '@libs/ddd';
import { Injectable } from '@nestjs/common';
import { CultureSubscriptionsPersistenceEntity } from '@modules/culture/database/entities/culture-subscriptions.persistence.entity';
import { CultureSubscriptionsEntity } from '@modules/culture/domain/entities/culture-subscriptions.entity';

@Injectable()
export class CultureSubscriptionsMapper
  implements
    Mapper<CultureSubscriptionsEntity, CultureSubscriptionsPersistenceEntity>
{
  toPersistence(
    entity: CultureSubscriptionsEntity,
  ): CultureSubscriptionsPersistenceEntity {
    const copy = entity.getProps();

    return new CultureSubscriptionsPersistenceEntity(
      copy.userId,
      copy.cultureId,
      copy.isPrimary,
    );
  }

  toDomain(
    record: CultureSubscriptionsPersistenceEntity,
  ): CultureSubscriptionsEntity {
    return new CultureSubscriptionsEntity({
      props: {
        cultureId: record.cultureId,
        userId: record.userId,
        isPrimary: record.isPrimary,
      },
      id: crypto.randomUUID(),
    });
  }

  toResponse(entity: CultureSubscriptionsEntity) {
    throw new Error('Method not implemented.');
  }
}

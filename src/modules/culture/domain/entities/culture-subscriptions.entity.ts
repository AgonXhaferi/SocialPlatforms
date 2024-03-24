import { AggregateID, AggregateRoot } from '@libs/ddd';
import * as crypto from 'crypto';
import { CultureSubscriptionsProps } from '@modules/culture/domain/props/culture-subscriptions.props';

export class CultureSubscriptionsEntity extends AggregateRoot<CultureSubscriptionsProps> {
  protected readonly _id: AggregateID;

  static create(cultureProps: CultureSubscriptionsProps) {
    const id = crypto.randomUUID();

    const props: CultureSubscriptionsProps = { ...cultureProps };

    return new CultureSubscriptionsEntity({ id, props });
  }

  public validate(): void {}
}

import { AggregateID, AggregateRoot } from '@libs/ddd';
import * as crypto from 'crypto';
import { CultureEventsProps } from '@modules/culture/domain/props/culture-events.props';

export class CultureEventsEntity extends AggregateRoot<CultureEventsProps> {
  protected readonly _id: AggregateID;

  static create(cultureProps: CultureEventsProps) {
    const id = crypto.randomUUID();

    const props: CultureEventsProps = { ...cultureProps };

    return new CultureEventsEntity({ id, props }); //TODO, check this out it may be overriden~ by the id value of the user props.
  }

  public validate(): void {}
}

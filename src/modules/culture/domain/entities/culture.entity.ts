import { AggregateID, AggregateRoot } from '@libs/ddd';
import * as crypto from 'crypto';
import { CultureProps } from '@modules/culture/domain/props/culture.props';

export class CultureEntity extends AggregateRoot<CultureProps> {
  protected readonly _id: AggregateID;

  static create(cultureProps: CultureProps) {
    const id = crypto.randomUUID();

    const props: CultureProps = { ...cultureProps };

    return new CultureEntity({ id, props }); //TODO, check this out it may be overriden~ by the id value of the user props.
  }

  public validate(): void {}
}

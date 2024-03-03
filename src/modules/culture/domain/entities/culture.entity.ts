import { AggregateID, AggregateRoot } from '@libs/ddd';
import * as crypto from 'crypto';
import { CultureProps } from '@modules/culture/domain/props/culture.props';

export class CultureEntity extends AggregateRoot<CultureProps> {
  protected readonly _id: AggregateID;
  //TODO: I need to research as to where this is set exactly.
  // As well as what is the difference between and Aggregate ID and an entity ID,
  // since in the domain driven hexagon example they just generate ab ID through the crypto command and work with that
  // simultaneously it is readonly so I'm not all that sure about this, I don't think I need the crypto function in general
  // considering that I have an auto-generate ID on the backends side..

  static create(cultureProps: CultureProps) {
    const id = crypto.randomUUID();

    const props: CultureProps = { ...cultureProps };

    return new CultureEntity({ id, props }); //TODO, check this out it may be overriden~ by the id value of the user props.
  }

  public validate(): void {}
}

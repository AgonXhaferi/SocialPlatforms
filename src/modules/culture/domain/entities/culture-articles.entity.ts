import { AggregateID, AggregateRoot } from '@libs/ddd';
import * as crypto from 'crypto';
import { CultureArticlesProps } from '@modules/culture/domain/props/culture-articles.props';

export class CultureArticlesEntity extends AggregateRoot<CultureArticlesProps> {
  protected readonly _id: AggregateID;

  static create(cultureProps: CultureArticlesProps) {
    const id = crypto.randomUUID();

    const props: CultureArticlesProps = { ...cultureProps };

    return new CultureArticlesEntity({ id, props }); //TODO, check this out it may be overriden~ by the id value of the user props.
  }

  //Protects culture invariant
  public validate(): void {}
}

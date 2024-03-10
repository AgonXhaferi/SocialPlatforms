import { ValueObject } from '@libs/ddd';

export interface CultureEventDurationProps {
  startDate: Date;
  endDate: Date;
}

export class CultureEventDurationValueObject extends ValueObject<CultureEventDurationProps> {
  protected validate(props: CultureEventDurationProps): void {
    throw new Error('Method not implemented.');
  }
  get startDate() {
    return this.props.startDate;
  }

  get endDate() {
    return this.props.endDate;
  }
}

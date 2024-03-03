import { ValueObject } from '@libs/ddd';

export interface CultureEventDurationProps {
  startDate: Date;
  endDate: Date;
}

export class CultureEventDurationValueObject extends ValueObject<CultureEventDurationProps> {
  get startDate() {
    return this.props.startDate;
  }

  get endDate() {
    return this.props.endDate;
  }
}

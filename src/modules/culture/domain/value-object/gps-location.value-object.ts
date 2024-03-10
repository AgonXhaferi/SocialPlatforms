import { ValueObject } from '@libs/ddd';

export interface GpsLocationProps {
  longitude: number;
  latitude: number;
}

export class GpsLocationValueObject extends ValueObject<GpsLocationProps> {
  protected validate(props: GpsLocationProps): void {
    throw new Error('Method not implemented.');
  }
  get longitude() {
    return this.props.longitude;
  }

  get latitude() {
    return this.props.latitude;
  }
}

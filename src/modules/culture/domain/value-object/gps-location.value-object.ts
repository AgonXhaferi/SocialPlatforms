import { ValueObject } from '@libs/ddd';

export interface GpsLocationProps {
  longitude: number;
  latitude: number;
}

export class GpsLocationValueObject extends ValueObject<GpsLocationProps> {
  get longitude() {
    return this.props.longitude;
  }

  get latitude() {
    return this.props.latitude;
  }
}

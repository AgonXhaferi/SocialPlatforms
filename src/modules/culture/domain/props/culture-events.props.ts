import { GpsLocationValueObject } from '@modules/culture/domain/value-object/gps-location.value-object';
import { CultureEventDurationValueObject } from '@modules/culture/domain/value-object/culture-event-duration.value-object';

export interface CultureEventsProps {
  name: string;
  description: string;
  culture: string;
  location: GpsLocationValueObject;
  duration: CultureEventDurationValueObject;
}

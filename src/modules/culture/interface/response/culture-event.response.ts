export class CultureEventResponse {
  id: string;
  name: string;
  description: string;
  longitude: number;
  latitude: number;
  startDate: Date;
  endDate: Date;

  constructor(props: CultureEventResponse) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.longitude = props.longitude;
    this.latitude = props.latitude;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
  }
}

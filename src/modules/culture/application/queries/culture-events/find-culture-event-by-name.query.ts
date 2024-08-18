export class FindCultureEventByNameQuery {
  cultureName: string;
  eventName: string;

  constructor(props: { cultureName: string; eventName: string }) {
    this.cultureName = props.cultureName;
    this.eventName = props.eventName;
  }
}

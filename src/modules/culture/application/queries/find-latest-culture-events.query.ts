export class FindLatestCultureEventsQuery {
  numberOfEvents: number;
  cultureName: string;

  constructor(props: FindLatestCultureEventsQuery) {
    this.numberOfEvents = props.numberOfEvents;
    this.cultureName = props.cultureName;
  }
}

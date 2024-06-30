export class FindIsUserSubscribedToCultureQuery {
  readonly cultureId: string;
  readonly userId: string;

  constructor(props: FindIsUserSubscribedToCultureQuery) {
    this.cultureId = props.cultureId;
    this.userId = props.userId;
  }
}

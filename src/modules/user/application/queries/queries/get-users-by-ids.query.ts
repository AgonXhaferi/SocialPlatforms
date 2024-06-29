export class GetUsersByIdsQuery {
  userIds: string[];

  constructor(props: GetUsersByIdsQuery) {
    this.userIds = props.userIds;
  }
}

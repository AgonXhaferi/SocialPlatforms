export class GetUserByIdsQuery {
  userIds: string[];

  constructor(props: GetUserByIdsQuery) {
    this.userIds = props.userIds;
  }
}

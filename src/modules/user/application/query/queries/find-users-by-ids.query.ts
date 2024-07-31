export class FindUsersByIdsQuery {
  userIds: string[];

  constructor(props: FindUsersByIdsQuery) {
    this.userIds = props.userIds;
  }
}

export class FindAreUsersFollowersQuery {
  followerId: string;
  followeeId: string;

  constructor(props: FindAreUsersFollowersQuery) {
    this.followerId = props.followerId;
    this.followeeId = props.followeeId;
  }
}

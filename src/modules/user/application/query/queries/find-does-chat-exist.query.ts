export class FindDoesChatExistQuery {
  userOneId: string;
  userTwoId: string;

  constructor(props: FindDoesChatExistQuery) {
    this.userOneId = props.userOneId;
    this.userTwoId = props.userTwoId;
  }
}

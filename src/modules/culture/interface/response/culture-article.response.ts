export class CultureArticleResponse {
  title: string;
  content: string;
  timeCreated: Date;

  constructor(props: CultureArticleResponse) {
    this.title = props.title;
    this.content = props.content;
    this.timeCreated = props.timeCreated;
  }
}

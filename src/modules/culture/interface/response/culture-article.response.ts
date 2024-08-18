export class CultureArticleResponse {
  id: string;
  title: string;
  content: string;
  timeCreated: Date;

  constructor(props: CultureArticleResponse) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.timeCreated = props.timeCreated;
  }
}

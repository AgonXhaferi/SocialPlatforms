export class FindCultureArticleByNameQuery {
  cultureName: string;
  articleName: string;

  constructor(props: { cultureName: string; articleName: string }) {
    this.cultureName = props.cultureName;
    this.articleName = props.articleName;
  }
}

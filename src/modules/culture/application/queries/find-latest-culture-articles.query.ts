export class FindLatestCultureArticlesQuery {
  numberOfArticles: number;
  cultureName: string;

  constructor(props: FindLatestCultureArticlesQuery) {
    this.numberOfArticles = props.numberOfArticles;
    this.cultureName = props.cultureName;
  }
}

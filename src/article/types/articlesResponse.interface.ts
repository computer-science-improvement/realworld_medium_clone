import { ArticleEntity } from '@app/article/article.entity';

export class ArticlesResponseInterface {
  articles: ArticleEntity[];
  articlesCount: number;
}

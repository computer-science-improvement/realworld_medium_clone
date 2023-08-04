import { Controller, Post } from '@nestjs/common';
import { ArticleService } from '@app/article/article.service';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post()
  async create() {
    return await this.articleService.createArticle();
  }
}

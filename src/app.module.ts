import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';
import ormconfig from '@app/ormconfig';
import { AuthMiddleware } from '@app/user/middleware/auth.middleware';
import { ArticleModule } from './article/article.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TagModule,
    UserModule,
    ArticleModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}

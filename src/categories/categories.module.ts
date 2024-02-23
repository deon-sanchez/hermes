import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { Categories, CategoriesSchema } from 'src/categories/categories.model';
import { PostsService } from 'src/posts/posts.service';
import { Posts, PostsSchema } from 'src/posts/posts.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: CategoriesSchema,
        name: Categories.name,
      },
      {
        schema: PostsSchema,
        name: Posts.name,
      },
    ]),
  ],
  providers: [CategoriesService, CategoriesResolver, PostsService],
  exports: [CategoriesService],
})
export class CategoriesModule {}

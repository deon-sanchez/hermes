import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Posts, PostsSchema } from 'src/posts/posts.model';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { UsersService } from 'src/users/users.service';
import { CommentsService } from 'src/comments/comments.service';
import { CategoriesService } from 'src/categories/categories.service';
import { Users, UsersSchema } from 'src/users/users.model';
import { Comments, CommentsSchema } from 'src/comments/comments.model';
import { Categories, CategoriesSchema } from 'src/categories/categories.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Posts.name, schema: PostsSchema },
      { name: Users.name, schema: UsersSchema },
      { name: Comments.name, schema: CommentsSchema },
      { name: Categories.name, schema: CategoriesSchema },
    ]),
  ],
  providers: [
    PostsService,
    PostsResolver,
    UsersService,
    CommentsService,
    CategoriesService,
  ],
  exports: [PostsService],
})
export class PostsModule {}

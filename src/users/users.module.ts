import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersResolver } from './users.resolver';

import { CommentsService } from 'src/comments/comments.service';
import { UsersService } from './users.service';
import { PostsService } from 'src/posts/posts.service';

import { Posts, PostsSchema } from 'src/posts/posts.model';
import { Comments, CommentsSchema } from 'src/comments/comments.model';
import { Users, UsersSchema } from 'src/users/users.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: UsersSchema, name: Users.name },
      {
        name: Posts.name,
        schema: PostsSchema,
      },
      {
        name: Comments.name,
        schema: CommentsSchema,
      },
    ]),
  ],
  providers: [UsersService, UsersResolver, CommentsService, PostsService],
  exports: [UsersService],
})
export class UsersModule {}

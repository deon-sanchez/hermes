import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommentsResolver } from './comments.resolver';
import { Comments, CommentsSchema } from 'src/comments/comments.model';
import { Users, UsersSchema } from 'src/users/users.model';
import { Posts, PostsSchema } from 'src/posts/posts.model';

import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: CommentsSchema,
        name: Comments.name,
      },
      {
        schema: UsersSchema,
        name: Users.name,
      },
      {
        schema: PostsSchema,
        name: Posts.name,
      },
    ]),
  ],
  providers: [CommentsService, CommentsResolver, UsersService, PostsService],
  exports: [CommentsService],
})
export class CommentsModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Posts, PostsSchema } from 'src/models/posts.model';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: PostsSchema, name: Posts.name }]),
  ],
  providers: [PostsService, PostsResolver],
  exports: [PostsService],
})
export class PostsModule {}

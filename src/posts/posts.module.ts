import { Module } from '@nestjs/common';
import { PostsResolver } from './Posts.resolver';
import { PostsService } from './Posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModel, PostsSchema } from './model/Posts.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: PostsSchema, name: PostsModel.name }]),
  ],
  providers: [PostsResolver, PostsService],
  exports: [PostsService],
})
export class PostsModule {}

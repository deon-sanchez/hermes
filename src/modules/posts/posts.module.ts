import { Module } from '@nestjs/common';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModel, PostsSchema } from './model/posts.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: PostsSchema, name: PostsModel.name }]),
  ],
  providers: [PostsService, PostsResolver],
  exports: [PostsService],
})
export class PostsModule {}

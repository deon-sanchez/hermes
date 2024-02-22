import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModel, PostSchema } from './model/post.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: PostSchema, name: PostModel.name }]),
  ],
  providers: [PostResolver, PostService],
  exports: [PostService],
})
export class PostModule {}

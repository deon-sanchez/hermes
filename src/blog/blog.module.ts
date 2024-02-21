import { Module } from '@nestjs/common';
import { BlogResolver } from './blog.resolver';
import { BlogService } from './blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModel, BlogSchema } from './model/blog.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: BlogSchema, name: BlogModel.name }]),
  ],
  providers: [BlogResolver, BlogService],
  exports: [BlogService],
})
export class BlogModule {}

import { Module } from '@nestjs/common';
import { BlogsResolver } from './blogs.resolver';
import { BlogsService } from './blogs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Blogs, BlogsSchema } from 'src/models/blogs.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: BlogsSchema, name: Blogs.name }]),
  ],
  providers: [BlogsService, BlogsResolver],
  exports: [BlogsService],
})
export class BlogsModule {}

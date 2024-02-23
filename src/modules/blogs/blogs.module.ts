import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BlogsResolver } from 'src/modules/blogs/blogs.resolver';
import { BlogsService } from 'src/modules/blogs/blogs.service';
import { Blogs, BlogsSchema } from 'src/models/blogs.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: BlogsSchema, name: Blogs.name }]),
  ],
  providers: [BlogsService, BlogsResolver],
  exports: [BlogsService],
})
export class BlogsModule {}

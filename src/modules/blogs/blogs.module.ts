import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Blogs, BlogsSchema } from 'src/models/blogs.model';
import { BlogsService } from './blogs.service';
import { BlogsResolver } from './blogs.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: BlogsSchema, name: Blogs.name }]),
  ],
  providers: [BlogsService, BlogsResolver],
  exports: [BlogsService],
})
export class BlogsModule {}

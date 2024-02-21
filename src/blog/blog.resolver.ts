import { Resolver, Query } from '@nestjs/graphql';

import { BlogModel } from './model/blog.model';
import { BlogService } from './blog.service';

@Resolver((of) => BlogModel)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Query((returns) => [BlogModel])
  blog(): Promise<BlogModel[]> {
    return this.blogService.getAllUsers();
  }
}

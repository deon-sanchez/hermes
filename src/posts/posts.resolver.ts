import { Resolver, Query } from '@nestjs/graphql';

import { PostsModel } from './model/Posts.model';
import { PostsService } from './Posts.service';

@Resolver((of) => PostsModel)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query((returns) => [PostsModel])
  Posts(): Promise<PostsModel[]> {
    return this.postsService.getAllUsers();
  }
}

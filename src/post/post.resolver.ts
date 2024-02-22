import { Resolver, Query } from '@nestjs/graphql';

import { PostModel } from './model/post.model';
import { PostService } from './post.service';

@Resolver((of) => PostModel)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query((returns) => [PostModel])
  post(): Promise<PostModel[]> {
    return this.postService.getAllUsers();
  }
}

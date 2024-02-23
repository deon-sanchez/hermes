import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { PostsService } from 'src/modules/posts/posts.service';
import { Posts } from 'src/models/Posts.model';
import {
  CreatePostsInput,
  FindPostsInput,
  UpdatePostsInput,
} from 'src/dtos/posts.input';

@Resolver(() => Posts)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [Posts])
  async getPosts(): Promise<Posts[]> {
    return this.postsService.findAll();
  }

  @Query(() => Posts)
  async getBlog(
    @Args('findPostsInput')
    findPostsInput: FindPostsInput,
  ): Promise<Posts> {
    return this.postsService.findOne(findPostsInput);
  }

  @Mutation(() => Posts)
  async createPosts(
    @Args('createPostsInput') createPostsInput: CreatePostsInput,
  ): Promise<Posts> {
    return this.postsService.create(createPostsInput);
  }

  @Mutation(() => Posts)
  async updatePosts(
    @Args('updatePostsInput') updatePostsInput: UpdatePostsInput,
  ): Promise<Posts> {
    return this.postsService.update(updatePostsInput._id, updatePostsInput);
  }

  @Mutation(() => Posts)
  async deletePosts(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ): Promise<Posts> {
    return this.postsService.delete(_id);
  }
}

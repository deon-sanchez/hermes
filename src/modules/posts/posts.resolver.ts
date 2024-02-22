import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { PostsModel } from 'src/models/Posts.model';
import {
  CreatePostInput,
  FindPostInput,
  FindPostsInput,
  UpdatePostInput,
} from 'src/dtos/posts.input';

@Resolver(() => PostsModel)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => PostsModel)
  async post(
    @Args('findPostInput')
    findPostInput: FindPostInput,
  ): Promise<PostsModel> {
    return this.postsService.findOne(findPostInput);
  }

  @Query(() => [PostsModel])
  async posts(
    @Args('FindPostsInput', { nullable: true }) findPostsInput?: FindPostsInput,
  ): Promise<PostsModel[]> {
    return this.postsService.findAll(findPostsInput);
  }

  @Mutation(() => PostsModel)
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
  ): Promise<PostsModel> {
    return this.postsService.create(createPostInput);
  }

  @Mutation(() => PostsModel)
  async updatePost(
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ): Promise<PostsModel> {
    return this.postsService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => PostsModel)
  async deletePost(
    @Args('id', { type: () => String }) id: string,
  ): Promise<PostsModel> {
    return this.postsService.delete(id);
  }
}

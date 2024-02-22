import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { PostsModel } from './model/Posts.model';
import { CreatePostInput, UpdatePostInput } from './dto/posts.input';

@Resolver(() => PostsModel)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [PostsModel])
  async posts(): Promise<PostsModel[]> {
    return this.postsService.findAll();
  }

  @Query(() => PostsModel)
  async post(
    @Args('id', { type: () => String }) id: string,
  ): Promise<PostsModel> {
    return this.postsService.findOne(id);
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

import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { PostsService } from 'src/posts/posts.service';
import { Posts } from 'src/posts/posts.model';
import {
  CreatePostsInput,
  FindPostInput,
  FindPostsInput,
  UpdatePostsInput,
} from 'src/posts/posts.input';
import { UsersService } from 'src/users/users.service';
import { CategoriesService } from 'src/categories/categories.service';
import { CommentsService } from 'src/comments/comments.service';

@Resolver(() => Posts)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly usersServices: UsersService,
    private readonly categoriesServices: CategoriesService,
    private readonly commentsServices: CommentsService,
  ) {}

  @Query(() => [Posts])
  async posts(
    @Args('findPostsInput')
    findPostsInput: FindPostsInput,
  ): Promise<Posts[]> {
    return this.postsService.findAll(findPostsInput);
  }

  @Query(() => Posts)
  async post(
    @Args('findPostsInput')
    findPostInput: FindPostInput,
  ): Promise<Posts> {
    return this.postsService.findOne(findPostInput);
  }

  @Mutation(() => Posts, { name: 'createPosts' })
  async createPosts(
    @Args('createPostsInput') createPostsInput: CreatePostsInput,
  ): Promise<Posts> {
    return this.postsService.create(createPostsInput);
  }

  @Mutation(() => Posts, { name: 'updatePosts' })
  async updatePosts(
    @Args('updatePostsInput') updatePostsInput: UpdatePostsInput,
  ): Promise<Posts> {
    return this.postsService.update(updatePostsInput._id, updatePostsInput);
  }

  @Mutation(() => Posts, { name: 'deletePosts' })
  async deletePosts(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ): Promise<Posts> {
    return this.postsService.delete(_id);
  }

  @ResolveField()
  async categories(@Parent() post: Posts) {
    const { _id } = post;
    return this.categoriesServices.findAll({ postId: _id });
  }

  @ResolveField()
  async comments(@Parent() post: Posts) {
    const { _id } = post;
    return this.commentsServices.findAll({ postId: _id });
  }

  @ResolveField()
  async users(@Parent() post: Posts) {
    const { _id } = post;
    return this.usersServices.findAll({ postId: _id });
  }
}

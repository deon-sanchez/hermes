import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { PostsService } from 'src/posts/posts.service';
import { Posts } from 'src/posts/posts.model';
import {
  CreatePostsInput,
  FindPostsInput,
  UpdatePostsInput,
} from 'src/posts/posts.input';
import { Categories } from 'src/categories/categories.model';
import { Comments } from 'src/comments/comments.model';
import { Users } from 'src/users/users.model';
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
  async posts(): Promise<Posts[]> {
    return this.postsService.findAll();
  }

  @Query(() => Posts)
  async post(
    @Args('findPostsInput')
    findPostsInput: FindPostsInput,
  ): Promise<Posts> {
    return this.postsService.findOne(findPostsInput);
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
    return this.categoriesServices.findAll();
  }

  @ResolveField()
  async comments(@Parent() post: Posts) {
    const { _id } = post;
    return this.commentsServices.findAll();
  }

  @ResolveField()
  async users(@Parent() post: Posts) {
    const { _id } = post;
    return this.usersServices.findAll();
  }
}

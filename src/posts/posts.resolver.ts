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
  CreatePostInput,
  FindPostInput,
  FindPostsInput,
  UpdatePostInput,
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

  @Query()
  async posts(
    @Args('findPostsInput')
    findPostsInput: FindPostsInput,
  ): Promise<Posts[]> {
    return this.postsService.findAll(findPostsInput);
  }

  @Query()
  async post(
    @Args('findPostsInput')
    findPostInput: FindPostInput,
  ): Promise<Posts> {
    return this.postsService.findOne(findPostInput);
  }

  @Mutation()
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
  ): Promise<Posts> {
    return this.postsService.create(createPostInput);
  }

  @Mutation()
  async updatePost(
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ): Promise<Posts> {
    return this.postsService.update(updatePostInput._id, updatePostInput);
  }

  @Mutation()
  async deletePost(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ): Promise<Posts> {
    return this.postsService.delete(_id);
  }

  // @ResolveField()
  // async categories(@Parent() post: Posts) {
  //   const { categoryId } = post;
  //   return this.categoriesServices.findOne({ _id: categoryId });
  // }

  // @ResolveField()
  // async comments(@Parent() post: Posts) {
  //   const { _id } = post;
  //   return this.commentsServices.findAll({ postId: _id });
  // }

  // @ResolveField()
  // async users(@Parent() post: Posts) {
  //   const { _id } = post;
  //   return this.usersServices.findAll({ postId: _id });
  // }
}

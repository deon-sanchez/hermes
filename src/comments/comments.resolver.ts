import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import {
  CreateCommentInput,
  FindCommentInput,
  FindCommentsInput,
  UpdateCommentInput,
} from 'src/comments/comments.input';

import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';
import { CommentsService } from './comments.service';

import { Comments } from 'src/comments/comments.model';

@Resolver(() => Comments)
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  @Query(() => [Comments])
  async comments(
    @Args('findCommentsInput') findCommentsInput: FindCommentsInput,
  ): Promise<Comments[]> {
    return this.commentsService.findAll(findCommentsInput);
  }

  @Query(() => Comments)
  async comment(
    @Args('findCommentInput') findCommentInput: FindCommentInput,
  ): Promise<Comments> {
    return this.commentsService.findOne(findCommentInput);
  }

  @Mutation(() => Comments)
  async createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ): Promise<Comments> {
    return this.commentsService.create(createCommentInput);
  }

  @Mutation(() => Comments)
  async updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ): Promise<Comments> {
    return this.commentsService.update(
      updateCommentInput._id,
      updateCommentInput,
    );
  }

  @Mutation(() => Comments)
  async deleteComment(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ): Promise<Comments> {
    return this.commentsService.delete(_id);
  }

  @ResolveField()
  async users(@Parent() comments: Comments) {
    const { _id } = comments;
    return this.usersService.findAll({ commentId: _id });
  }

  @ResolveField()
  async posts(@Parent() comments: Comments) {
    const { _id } = comments;
    return this.postsService.findAll({ commentId: _id });
  }
}

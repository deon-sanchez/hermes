import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { CommentsService } from './comments.service';
import { Comments } from 'src/models/comments.model';
import {
  CreateCommentInput,
  FindCommentsInput,
  UpdateCommentInput,
} from 'src/dtos/comments.input';

@Resolver(() => Comments)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Query(() => [Comments])
  async comments(): Promise<Comments[]> {
    return this.commentsService.findAll();
  }

  @Query(() => Comments)
  async comment(
    @Args('findCommentsInput') findCommentsInput: FindCommentsInput,
  ): Promise<Comments> {
    return this.commentsService.findOne(findCommentsInput);
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
}

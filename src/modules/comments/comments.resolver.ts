import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { CommentsModel } from 'src/models/comments.model';
import {
  CreateCommentInput,
  FindCommentsInput,
  UpdateCommentInput,
} from 'src/dtos/comments.input';

@Resolver(() => CommentsModel)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Query(() => [CommentsModel])
  async comments(
    @Args('findCommentsInput', { nullable: true })
    findCommentsInput: FindCommentsInput,
  ): Promise<CommentsModel[]> {
    return this.commentsService.findAll(findCommentsInput);
  }

  @Query(() => CommentsModel)
  async comment(
    @Args('findCommentsInput') findCommentsInput: FindCommentsInput,
  ): Promise<CommentsModel> {
    return this.commentsService.findOne(findCommentsInput);
  }

  @Mutation(() => CommentsModel)
  async createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ): Promise<CommentsModel> {
    return this.commentsService.create(createCommentInput);
  }

  @Mutation(() => CommentsModel)
  async updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ): Promise<CommentsModel> {
    return this.commentsService.update(
      updateCommentInput._id,
      updateCommentInput,
    );
  }

  @Mutation(() => CommentsModel)
  async deleteComment(
    @Args('id', { type: () => String }) id: string,
  ): Promise<CommentsModel> {
    return this.commentsService.delete(id);
  }
}

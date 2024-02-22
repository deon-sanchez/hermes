import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { CommentsModel } from './model/comments.model';
import { CreateCommentInput, UpdateCommentInput } from './dto/comments.input';

@Resolver(() => CommentsModel)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Query(() => [CommentsModel])
  async comments(): Promise<CommentsModel[]> {
    return this.commentsService.findAll();
  }

  @Query(() => CommentsModel)
  async comment(
    @Args('id', { type: () => String }) id: string,
  ): Promise<CommentsModel> {
    return this.commentsService.findOne(id);
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
      updateCommentInput.id,
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

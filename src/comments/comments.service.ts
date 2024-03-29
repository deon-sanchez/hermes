import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { CommentsDocument, Comments } from 'src/comments/comments.model';
import {
  CreateCommentInput,
  FindCommentInput,
  FindCommentsInput,
  UpdateCommentInput,
} from 'src/comments/comments.input';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name)
    private commentsModel: Model<CommentsDocument>,
  ) {}

  async create(createCommentDto: CreateCommentInput): Promise<Comments> {
    const createdComment = new this.commentsModel(createCommentDto);
    return createdComment.save();
  }

  async findAll(findCommentsInput: FindCommentsInput): Promise<Comments[]> {
    if (findCommentsInput?.postId) {
      return this.commentsModel
        .find({ postId: findCommentsInput.postId })
        .exec();
    }
    if (findCommentsInput?.userId) {
      return this.commentsModel
        .find({ userId: findCommentsInput.userId })
        .exec();
    }
    return this.commentsModel.find().exec();
  }

  async findOne(findCommentInput: FindCommentInput): Promise<Comments> {
    if (findCommentInput?._id) {
      return await this.commentsModel.findById(findCommentInput._id).exec();
    }
  }

  async update(
    _id: MongooseSchema.Types.ObjectId,
    updateCommentDto: UpdateCommentInput,
  ): Promise<Comments> {
    return this.commentsModel
      .findByIdAndUpdate(_id, updateCommentDto, { new: true })
      .exec();
  }

  async delete(_id: MongooseSchema.Types.ObjectId): Promise<Comments> {
    return this.commentsModel.findByIdAndDelete(_id).exec();
  }
}

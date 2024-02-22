import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { CommentsDocument, CommentsModel } from 'src/models/comments.model';
import {
  CreateCommentInput,
  FindCommentsInput,
  UpdateCommentInput,
} from 'src/dtos/comments.input';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(CommentsModel.name)
    private commentModel: Model<CommentsDocument>,
  ) {}

  async create(createCommentDto: CreateCommentInput): Promise<CommentsModel> {
    const createdComment = new this.commentModel(createCommentDto);
    return createdComment.save();
  }

  async findAll(findCommentInput: FindCommentsInput): Promise<CommentsModel[]> {
    if (findCommentInput?.userId) {
      return await this.commentModel
        .find({ userId: findCommentInput.userId })
        .exec();
    } else if (findCommentInput?.postId) {
      return await this.commentModel
        .find({ postId: findCommentInput.postId })
        .exec();
    }

    return this.commentModel.find().exec();
  }

  async findOne(findCommentInput: FindCommentsInput): Promise<CommentsModel> {
    if (findCommentInput?._id) {
      return await this.commentModel.findById(findCommentInput._id).exec();
    } else if (findCommentInput?.userId) {
      return await this.commentModel
        .findOne({ userId: findCommentInput.userId })
        .exec();
    } else if (findCommentInput?.postId) {
      return await this.commentModel
        .findOne({ postId: findCommentInput.postId })
        .exec();
    }
  }

  async update(
    id: MongooseSchema.Types.ObjectId,
    updateCommentDto: UpdateCommentInput,
  ): Promise<CommentsModel> {
    return this.commentModel
      .findByIdAndUpdate(id, updateCommentDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<CommentsModel> {
    return this.commentModel.findByIdAndDelete(id).exec();
  }
}

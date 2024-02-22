import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentsDocument, CommentsModel } from 'src/models/comments.model';
import {
  CreateCommentInput,
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

  async findAll(): Promise<CommentsModel[]> {
    return this.commentModel.find().exec();
  }

  async findOne(id: string): Promise<CommentsModel> {
    return this.commentModel.findById(id).exec();
  }

  async update(
    id: string,
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

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { PostsDocument, Posts } from 'src/posts/posts.model';
import {
  CreatePostsInput,
  FindPostInput,
  FindPostsInput,
  UpdatePostsInput,
} from 'src/posts/posts.input';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private postsModel: Model<PostsDocument>,
  ) {}

  async create(createPostsDto: CreatePostsInput): Promise<Posts> {
    const createdPosts = new this.postsModel(createPostsDto);
    return createdPosts.save();
  }

  async findAll(findPostsInput: FindPostsInput): Promise<Posts[]> {
    if (findPostsInput?.categoryId) {
      return await this.postsModel
        .find({ _id: findPostsInput.categoryId })
        .exec();
    }
    if (findPostsInput?.userId) {
      return await this.postsModel.find({ _id: findPostsInput.userId }).exec();
    }
    if (findPostsInput?.commentId) {
      return await this.postsModel
        .find({ _id: findPostsInput.commentId })
        .exec();
    }

    return this.postsModel.find().exec();
  }

  async findOne(findPostInput: FindPostInput): Promise<Posts> {
    if (findPostInput?._id) {
      return await this.postsModel.findById(findPostInput._id).exec();
    }
  }

  async update(
    _id: MongooseSchema.Types.ObjectId,
    updatePostsDto: UpdatePostsInput,
  ): Promise<Posts> {
    return this.postsModel
      .findByIdAndUpdate(_id, updatePostsDto, {
        new: true,
      })
      .exec();
  }

  async delete(_id: MongooseSchema.Types.ObjectId): Promise<Posts> {
    return this.postsModel.findByIdAndDelete(_id).exec();
  }
}

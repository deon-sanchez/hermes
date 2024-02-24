import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { PostsDocument, Posts } from 'src/posts/posts.model';
import {
  CreatePostInput,
  FindPostInput,
  FindPostsInput,
  UpdatePostInput,
} from 'src/posts/posts.input';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private postsModel: Model<PostsDocument>,
  ) {}

  async create(createPostInput: CreatePostInput): Promise<Posts> {
    const createdPosts = new this.postsModel(createPostInput);
    return createdPosts.save();
  }

  async findAll(findPostsInput: FindPostsInput): Promise<Posts[]> {
    if (findPostsInput?.categoryId) {
      return await this.postsModel
        .find({ categoryId: findPostsInput.categoryId })
        .exec();
    }
    if (findPostsInput?.userId) {
      return await this.postsModel
        .find({ userId: findPostsInput.userId })
        .exec();
    }
    if (findPostsInput?.commentId) {
      return await this.postsModel
        .find({ commentId: findPostsInput.commentId })
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
    updatePostsDto: UpdatePostInput,
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

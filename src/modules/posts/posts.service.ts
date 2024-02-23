import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { PostsDocument, Posts } from 'src/models/posts.model';
import {
  CreatePostsInput,
  FindPostsInput,
  UpdatePostsInput,
} from 'src/dtos/posts.input';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private postsModel: Model<PostsDocument>,
  ) {}

  async create(createPostsDto: CreatePostsInput): Promise<Posts> {
    const createdPosts = new this.postsModel(createPostsDto);
    return createdPosts.save();
  }

  async findAll(): Promise<Posts[]> {
    return this.postsModel.find().exec();
  }

  async findOne(findPostsInput: FindPostsInput): Promise<Posts> {
    if (findPostsInput?._id) {
      return await this.postsModel.findById(findPostsInput._id).exec();
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

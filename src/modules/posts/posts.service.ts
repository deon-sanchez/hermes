import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostsDocument, PostsModel } from 'src/models/posts.model';
import {
  CreatePostInput,
  FindPostInput,
  FindPostsInput,
  UpdatePostInput,
} from 'src/dtos/posts.input';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostsModel.name) private postModel: Model<PostsDocument>,
  ) {}

  async create(createPostDto: CreatePostInput): Promise<PostsModel> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async findAll(findPostsInput: FindPostsInput): Promise<PostsModel[]> {
    if (findPostsInput?.userId) {
      return this.postModel.find({ userId: findPostsInput.userId }).exec();
    } else if (findPostsInput?.categoryId) {
      return this.postModel
        .find({ categoryId: findPostsInput.categoryId })
        .exec();
    }
    return this.postModel.find().exec();
  }

  async findOne(findPostInput: FindPostInput): Promise<PostsModel> {
    if (findPostInput?.id) {
      return this.postModel.findById(findPostInput.id).exec();
    } else if (findPostInput?.userId) {
      return this.postModel.findOne({ userId: findPostInput.userId }).exec();
    }
  }

  async update(
    id: string,
    updatePostDto: UpdatePostInput,
  ): Promise<PostsModel> {
    return this.postModel
      .findByIdAndUpdate(id, updatePostDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<PostsModel> {
    return this.postModel.findByIdAndDelete(id).exec();
  }
}

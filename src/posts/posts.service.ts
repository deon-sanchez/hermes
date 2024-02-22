import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostsDocument, PostsModel } from './model/Posts.model';
import { CreatePostInput, UpdatePostInput } from './dto/posts.input';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostsModel.name) private postModel: Model<PostsDocument>,
  ) {}

  async create(createPostDto: CreatePostInput): Promise<PostsModel> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async findAll(): Promise<PostsModel[]> {
    return this.postModel.find().exec();
  }

  async findOne(id: string): Promise<PostsModel> {
    return this.postModel.findById(id).exec();
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

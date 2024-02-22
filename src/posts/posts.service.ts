import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostsDocument, PostsModel } from './model/Posts.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostsModel.name) private postsModel: Model<PostsDocument>,
  ) {}

  async getAllUsers(): Promise<PostsModel[]> {
    return await this.postsModel.find().exec();
  }
}

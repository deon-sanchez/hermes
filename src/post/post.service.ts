import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument, PostModel } from './model/post.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostModel.name) private postModel: Model<PostDocument>,
  ) {}

  async getAllUsers(): Promise<PostModel[]> {
    return await this.postModel.find().exec();
  }
}

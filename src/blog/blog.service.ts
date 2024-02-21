import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogDocument, BlogModel } from './model/blog.model';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(BlogModel.name) private blogModel: Model<BlogDocument>,
  ) {}

  async getAllUsers(): Promise<BlogModel[]> {
    return await this.blogModel.find().exec();
  }
}

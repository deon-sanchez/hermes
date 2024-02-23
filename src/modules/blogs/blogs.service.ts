import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { BlogsDocument, Blogs } from 'src/models/blogs.model';
import {
  CreateBlogsInput,
  FindBlogsInput,
  UpdateBlogsInput,
} from 'src/dtos/blogs.input';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blogs.name) private BlogsModel: Model<BlogsDocument>,
  ) {}

  async create(createBlogsDto: CreateBlogsInput): Promise<Blogs> {
    const createdBlogs = new this.BlogsModel(createBlogsDto);
    return createdBlogs.save();
  }

  async findAll(): Promise<Blogs[]> {
    return this.BlogsModel.find().exec();
  }

  async findOne(findBlogsInput: FindBlogsInput): Promise<Blogs> {
    if (findBlogsInput?._id) {
      return await this.BlogsModel.findById(findBlogsInput._id).exec();
    }
  }

  async update(
    _id: MongooseSchema.Types.ObjectId,
    updateBlogsDto: UpdateBlogsInput,
  ): Promise<Blogs> {
    return this.BlogsModel.findByIdAndUpdate(_id, updateBlogsDto, {
      new: true,
    }).exec();
  }

  async delete(_id: MongooseSchema.Types.ObjectId): Promise<Blogs> {
    return this.BlogsModel.findByIdAndDelete(_id).exec();
  }
}

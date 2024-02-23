import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { CategoriesDocument, Categories } from 'src/models/categories.model';
import {
  CreateCategoryInput,
  FindCategoryInput,
  UpdateCategoryInput,
} from 'src/dtos/categories.input';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name)
    private categoryModel: Model<CategoriesDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryInput): Promise<Categories> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAll(): Promise<Categories[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(findCategoryInput: FindCategoryInput): Promise<Categories> {
    return this.categoryModel.findById(findCategoryInput._id).exec();
  }

  async update(
    _id: MongooseSchema.Types.ObjectId,
    updateCategoryDto: UpdateCategoryInput,
  ): Promise<Categories> {
    return this.categoryModel
      .findByIdAndUpdate(_id, updateCategoryDto, { new: true })
      .exec();
  }

  async delete(_id: MongooseSchema.Types.ObjectId): Promise<Categories> {
    return this.categoryModel.findByIdAndDelete(_id).exec();
  }
}

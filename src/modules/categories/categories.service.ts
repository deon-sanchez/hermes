import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import {
  CategoriesDocument,
  CategoriesModel,
} from 'src/models/categories.model';
import {
  CreateCategoryInput,
  FindCategoryInput,
  UpdateCategoryInput,
} from 'src/dtos/categories.input';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(CategoriesModel.name)
    private categoryModel: Model<CategoriesDocument>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryInput,
  ): Promise<CategoriesModel> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAll(): Promise<CategoriesModel[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(
    findCategoryInput: FindCategoryInput,
  ): Promise<CategoriesModel> {
    return this.categoryModel.findById(findCategoryInput._id).exec();
  }

  async update(
    id: MongooseSchema.Types.ObjectId,
    updateCategoryDto: UpdateCategoryInput,
  ): Promise<CategoriesModel> {
    return this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<CategoriesModel> {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}

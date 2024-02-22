import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesDocument, CategoriesModel } from './model/categories.model';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from './dto/categories.input';

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

  async findOne(id: string): Promise<CategoriesModel> {
    return this.categoryModel.findById(id).exec();
  }

  async update(
    id: string,
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

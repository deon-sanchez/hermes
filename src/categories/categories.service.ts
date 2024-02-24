import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import {
  CategoriesDocument,
  Categories,
} from 'src/categories/categories.model';
import {
  CreateCategoryInput,
  FindCategoryInput,
  UpdateCategoryInput,
} from 'src/categories/categories.input';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name)
    private categoryModel: Model<CategoriesDocument>,
  ) {}

  async findAll(): Promise<Categories[]> {
    try {
      return await this.categoryModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Error finding categories');
    }
  }

  async findOne(findCategoryInput: FindCategoryInput): Promise<Categories> {
    const category = await this.categoryModel
      .findById(findCategoryInput?._id)
      .exec();

    if (!category) {
      throw new InternalServerErrorException('Error finding category');
    }
    return category;
  }

  async create(createCategoryDto: CreateCategoryInput): Promise<Categories> {
    try {
      const createdCategory = new this.categoryModel(createCategoryDto);

      return createdCategory.save();
    } catch (error) {
      throw new InternalServerErrorException('Error creating category');
    }
  }

  async update(
    _id: MongooseSchema.Types.ObjectId,
    updateCategoryDto: UpdateCategoryInput,
  ): Promise<Categories> {
    const updatedCategory = await this.categoryModel
      .findByIdAndUpdate(_id, updateCategoryDto, { new: true })
      .exec();

    if (!updatedCategory) {
      throw new InternalServerErrorException('Error updating category');
    }

    return updatedCategory;
  }

  async delete(_id: MongooseSchema.Types.ObjectId): Promise<Categories> {
    const deletedCategory = await this.categoryModel
      .findByIdAndDelete(_id)
      .exec();

    if (!deletedCategory) {
      throw new InternalServerErrorException('Error deleting category');
    }

    return deletedCategory;
  }
}

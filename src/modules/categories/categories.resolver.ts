import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { CategoriesService } from './categories.service';
import { Categories } from 'src/models/categories.model';
import {
  CreateCategoryInput,
  FindCategoryInput,
  UpdateCategoryInput,
} from 'src/dtos/categories.input';

@Resolver(() => Categories)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => [Categories])
  async getCategories(): Promise<Categories[]> {
    return this.categoriesService.findAll();
  }

  @Query(() => Categories)
  async getCategory(
    @Args('findCategoryInput') findCategoryInput: FindCategoryInput,
  ): Promise<Categories> {
    return this.categoriesService.findOne(findCategoryInput);
  }

  @Mutation(() => Categories)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ): Promise<Categories> {
    return this.categoriesService.create(createCategoryInput);
  }

  @Mutation(() => Categories)
  async updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ): Promise<Categories> {
    return this.categoriesService.update(
      updateCategoryInput._id,
      updateCategoryInput,
    );
  }

  @Mutation(() => Categories)
  async deleteCategory(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ): Promise<Categories> {
    return this.categoriesService.delete(_id);
  }
}

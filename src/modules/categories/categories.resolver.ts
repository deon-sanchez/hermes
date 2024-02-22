import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { CategoriesModel } from 'src/models/categories.model';
import {
  CreateCategoryInput,
  FindCategoryInput,
  UpdateCategoryInput,
} from 'src/dtos/categories.input';

@Resolver(() => CategoriesModel)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => [CategoriesModel])
  async categories(): Promise<CategoriesModel[]> {
    return this.categoriesService.findAll();
  }

  @Query(() => CategoriesModel)
  async category(
    @Args('findCategoryInput') findCategoryInput: FindCategoryInput,
  ): Promise<CategoriesModel> {
    return this.categoriesService.findOne(findCategoryInput);
  }

  @Mutation(() => CategoriesModel)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ): Promise<CategoriesModel> {
    return this.categoriesService.create(createCategoryInput);
  }

  @Mutation(() => CategoriesModel)
  async updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ): Promise<CategoriesModel> {
    return this.categoriesService.update(
      updateCategoryInput._id,
      updateCategoryInput,
    );
  }

  @Mutation(() => CategoriesModel)
  async deleteCategory(
    @Args('_id', { type: () => String }) _id: string,
  ): Promise<CategoriesModel> {
    return this.categoriesService.delete(_id);
  }
}

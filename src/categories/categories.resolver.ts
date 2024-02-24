import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import {
  CreateCategoryInput,
  FindCategoryInput,
  UpdateCategoryInput,
} from 'src/categories/categories.input';

import { PostsService } from 'src/posts/posts.service';
import { CategoriesService } from './categories.service';

import { Categories } from 'src/categories/categories.model';

@Resolver(() => Categories)
export class CategoriesResolver {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly postsService: PostsService,
  ) {}

  @Query(() => [Categories])
  async categories(): Promise<Categories[]> {
    return this.categoriesService.findAll();
  }

  @Query(() => Categories)
  async category(
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

  // @ResolveField()
  // async posts(@Parent() category: Categories) {
  //   const { _id } = category;
  //   return this.postsService.findAll({ categoryId: _id });
  // }
}

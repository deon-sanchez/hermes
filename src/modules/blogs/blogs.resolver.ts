import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlogsService } from 'src/modules/blogs/blogs.service';
import { Blogs } from 'src/models/Blogs.model';
import { Schema as MongooseSchema } from 'mongoose';
import {
  CreateBlogsInput,
  FindBlogsInput,
  UpdateBlogsInput,
} from 'src/dtos/blogs.input';

@Resolver(() => Blogs)
export class BlogsResolver {
  constructor(private readonly blogsService: BlogsService) {}

  @Query(() => [Blogs])
  getBlogs(): Promise<Blogs[]> {
    return this.blogsService.findAll();
  }

  @Query(() => Blogs)
  getBlog(
    @Args('findBlogsInput')
    findBlogsInput: FindBlogsInput,
  ): Promise<Blogs> {
    return this.blogsService.findOne(findBlogsInput);
  }

  @Mutation(() => Blogs)
  createBlogs(
    @Args('createBlogsInput') createBlogsInput: CreateBlogsInput,
  ): Promise<Blogs> {
    return this.blogsService.create(createBlogsInput);
  }

  @Mutation(() => Blogs)
  updateBlogs(
    @Args('updateBlogsInput') updateBlogsInput: UpdateBlogsInput,
  ): Promise<Blogs> {
    return this.blogsService.update(updateBlogsInput._id, updateBlogsInput);
  }

  @Mutation(() => Blogs)
  deleteBlogs(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ): Promise<Blogs> {
    return this.blogsService.delete(_id);
  }
}

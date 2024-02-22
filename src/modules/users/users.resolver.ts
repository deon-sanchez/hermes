import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UsersDocument, UsersModel } from 'src/models/users.model';
import { CreateUserInput, FindUserInput } from 'src/dtos/users.input';
import { PostsService } from '../posts/posts.service';
import { UsersService } from './users.service';
import { PostsModel } from 'src/models/posts.model';

@Resolver((of) => UsersModel)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsServices: PostsService,
  ) {}

  @Query((_returns) => [UsersModel], { name: 'users' })
  getUsers(): Promise<UsersModel[]> {
    return this.usersService.findAll();
  }

  @Query((_returns) => UsersModel, { name: 'user' })
  getUser(
    @Args('findUserInput') findUserInput: FindUserInput,
  ): Promise<UsersModel> {
    return this.usersService.findOne(findUserInput);
  }

  @Mutation((_returns) => UsersModel, { name: 'createUser' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @ResolveField('posts', (_returns) => [PostsModel])
  async getPosts(@Parent() user: UsersDocument) {
    const { _id } = user;
    return this.postsServices.findAll({ userId: _id });
  }
}

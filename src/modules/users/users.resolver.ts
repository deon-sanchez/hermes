import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersModel } from 'src/models/users.model';
import { CreateUserInput, FindUserInput } from 'src/dtos/users.input';
import { PostsService } from '../posts/posts.service';
import { UsersService } from './users.service';

@Resolver((of) => UsersModel)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    // private readonly postsServices: PostsService,
  ) {}

  @Query(() => [UsersModel], { name: 'users' })
  getUsers(): Promise<UsersModel[]> {
    return this.usersService.findAll();
  }

  @Query(() => UsersModel, { name: 'user' })
  getUser(
    @Args('findUserInput') findUserInput: FindUserInput,
  ): Promise<UsersModel> {
    return this.usersService.findOne(findUserInput);
  }

  @Mutation(() => UsersModel, { name: 'createUser' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  // @ResolveProperty('posts', () => [PostsModel])
  // async getPosts(@Parent() user: UsersDocument) {
  //   const { _id } = user;
  //   return this.postsServices.findAll({ userId: _id });
  // }
}

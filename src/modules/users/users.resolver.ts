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

  @Query((returns) => [UsersModel])
  users(): Promise<UsersModel[]> {
    return this.usersService.findAll();
  }

  @Query((returns) => UsersModel)
  user(
    @Args('findUserInput') findUserInput: FindUserInput,
  ): Promise<UsersModel> {
    return this.usersService.findOne(findUserInput);
  }

  @Mutation((returns) => UsersModel)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  // @ResolveField(() => [PostsModel])
  // async posts(@Parent() user: UsersDocument) {
  //   const u = await user.populate({ path: 'posts', model: PostsModel.name });
  //   const x = await this.postsServices.findAll({ userId: user._id });
  //   return x;
  // }
}

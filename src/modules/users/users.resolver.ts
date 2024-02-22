import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UsersDocument, UsersModel } from 'src/models/users.model';
import { CreateUserInput } from 'src/dtos/users.input';
import { PostsService } from '../posts/posts.service';
import { UsersService } from './users.service';

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
  user(@Args('id') id: string): Promise<UsersModel> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => UsersModel)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  // @ResolveField()
  // async posts(@Parent() user: UsersDocument) {
  //   return await this.postsServices.findByUserId(user._id);
  // }
}

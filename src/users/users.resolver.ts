import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Users } from 'src/users/users.model';
import {
  CreateUserInput,
  FindUserInput,
  FindUsersInput,
} from 'src/users/users.input';
import { UsersService } from './users.service';
import { CommentsService } from 'src/comments/comments.service';
import { PostsService } from 'src/posts/posts.service';

@Resolver(() => Users)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly commentsService: CommentsService,
    private readonly postsService: PostsService,
  ) {}

  @Query(() => [Users])
  users(
    @Args('findUsersInput') findUsersInput: FindUsersInput,
  ): Promise<Users[]> {
    return this.usersService.findAll(findUsersInput);
  }

  @Query(() => Users)
  user(@Args('findUserInput') findUserInput: FindUserInput): Promise<Users> {
    return this.usersService.findOne(findUserInput);
  }

  @Mutation(() => Users)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @ResolveField()
  async comments(@Parent() users: Users) {
    const { _id } = users;
    return this.commentsService.findAll({ userId: _id });
  }

  @ResolveField()
  async posts(@Parent() users: Users) {
    const { _id } = users;
    return this.postsService.findAll({ userId: _id });
  }
}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Users } from 'src/users/users.model';
import {
  CreateUserInput,
  FindUserInput,
  FindUsersInput,
} from 'src/users/users.input';
import { UsersService } from './users.service';

@Resolver(() => Users)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

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
}

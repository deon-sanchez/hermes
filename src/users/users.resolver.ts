import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UsersModel } from './model/users.model';
import { CreateUserInput } from './dto/users.input';

@Resolver(() => UsersModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UsersModel], { name: 'getAllUsers' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => UsersModel, { name: 'getUser' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => UsersModel)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }
}

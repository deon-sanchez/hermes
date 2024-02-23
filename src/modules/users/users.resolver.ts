import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Users } from 'src/models/users.model';
import { CreateUserInput, FindUserInput } from 'src/dtos/users.input';
import { UsersService } from './users.service';

@Resolver(() => Users)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [Users])
  getUsers(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Query(() => Users)
  getUser(@Args('findUserInput') findUserInput: FindUserInput): Promise<Users> {
    return this.usersService.findOne(findUserInput);
  }

  @Mutation(() => Users)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }
}

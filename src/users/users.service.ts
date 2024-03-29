import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UsersDocument, Users } from 'src/users/users.model';
import {
  CreateUserInput,
  FindUserInput,
  FindUsersInput,
} from 'src/users/users.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<Users> {
    const createdUser = new this.userModel(createUserInput);
    return createdUser.save();
  }

  async findAll(findUsersInput: FindUsersInput): Promise<Users[]> {
    let users: Users[];

    if (findUsersInput?.postId) {
      users = await this.userModel
        .find({ postId: findUsersInput.postId })
        .exec();
    } else if (findUsersInput?.commentId) {
      users = await this.userModel
        .find({ commentId: findUsersInput.commentId })
        .exec();
    } else {
      users = await this.userModel.find().exec();
    }

    if (!users) {
      throw new InternalServerErrorException();
    }

    return users;
  }

  async findOne(findUserInput: FindUserInput): Promise<Users> {
    let users: Users;

    if (findUserInput?._id) {
      users = await this.userModel.findById(findUserInput._id).lean().exec();
    } else if (findUserInput?.email) {
      users = await this.userModel
        .findOne({ email: findUserInput.email })
        .lean()
        .exec();
    }

    if (!users) {
      throw new NotFoundException(`User not found`);
    }

    return users;
  }
}

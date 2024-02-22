import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDocument, UsersModel } from 'src/models/users.model';
import { CreateUserInput, FindUserInput } from 'src/dtos/users.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UsersModel.name) private usersModel: Model<UsersDocument>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<UsersModel> {
    const createdUser = new this.usersModel(createUserInput);
    return createdUser.save();
  }

  async findAll(): Promise<UsersModel[]> {
    const users = await this.usersModel.find().lean().exec();

    if (!users) {
      throw new InternalServerErrorException();
    }
    return users;
  }

  async findOne(findUserInput: FindUserInput): Promise<UsersModel> {
    let users: UsersModel;

    if (findUserInput?._id) {
      users = await this.usersModel.findById(findUserInput._id).lean().exec();
    } else if (findUserInput?.email) {
      users = await this.usersModel
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

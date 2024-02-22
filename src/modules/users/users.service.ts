import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDocument, UsersModel } from 'src/models/users.model';
import { CreateUserInput } from 'src/dtos/users.input';

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

  async findOne(id: string): Promise<UsersModel> {
    const user = await this.usersModel.findById(id).lean().exec();

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }
}

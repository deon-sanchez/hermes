import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDocument, UsersModel } from './model/users.model';
import { CreateUserInput } from './dto/users.input';

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
    return this.usersModel.find().exec();
  }

  async findOne(id: string): Promise<UsersModel> {
    return this.usersModel.findById(id).exec();
  }
}

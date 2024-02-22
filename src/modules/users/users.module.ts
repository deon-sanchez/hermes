import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModel, UsersSchema } from './model/users.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: UsersSchema, name: UsersModel.name }]),
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}

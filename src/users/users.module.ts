import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { Users, UsersSchema } from 'src/users/users.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: UsersSchema, name: Users.name }]),
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
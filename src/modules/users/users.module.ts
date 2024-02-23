import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/models/users.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: UsersSchema, name: Users.name }]),
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}

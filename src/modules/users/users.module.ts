import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModel, UsersSchema } from 'src/models/users.model';
import { PostsService } from '../posts/posts.service';
import { PostsModel, PostsSchema } from 'src/models/posts.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: UsersSchema, name: UsersModel.name, collection: 'users' },
      { schema: PostsSchema, name: PostsModel.name, collection: 'posts' },
    ]),
  ],
  providers: [UsersService, PostsService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}

import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class FindUsersInput {
  @Field(() => String)
  postId?: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  commentId?: MongooseSchema.Types.ObjectId;
}

export class FindUserInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  email: string;
}

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

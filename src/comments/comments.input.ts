import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class FindCommentsInput {
  @Field()
  postId: MongooseSchema.Types.ObjectId;

  @Field()
  userId: MongooseSchema.Types.ObjectId;
}

@InputType()
export class FindCommentInput {
  @Field()
  _id: MongooseSchema.Types.ObjectId;
}

@InputType()
export class CreateCommentInput {
  @Field()
  @IsNotEmpty()
  postId: MongooseSchema.Types.ObjectId;

  @Field()
  @IsNotEmpty()
  userId: MongooseSchema.Types.ObjectId;

  @Field()
  @IsNotEmpty()
  content: string;
}

@InputType()
export class UpdateCommentInput {
  @Field()
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @IsNotEmpty()
  content: string;
}

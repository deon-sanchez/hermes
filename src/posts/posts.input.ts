import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class FindPostsInput {
  @Field()
  categoryId: MongooseSchema.Types.ObjectId;

  @Field()
  userId: MongooseSchema.Types.ObjectId;

  @Field()
  commentId: MongooseSchema.Types.ObjectId;
}

@InputType()
export class FindPostInput {
  @Field()
  _id: MongooseSchema.Types.ObjectId;
}

@InputType()
export class CreatePostInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNotEmpty()
  content: string;

  @Field()
  @IsNotEmpty()
  userId: MongooseSchema.Types.ObjectId;

  @Field()
  @IsNotEmpty()
  categoryId: MongooseSchema.Types.ObjectId;
}

@InputType()
export class UpdatePostInput {
  @Field()
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNotEmpty()
  content: string;
}

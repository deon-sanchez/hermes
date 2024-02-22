import { InputType, Field, ID } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class FindCommentsInput {
  @Field(() => String, { nullable: true })
  _id?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  userId?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  postId?: MongooseSchema.Types.ObjectId;
}

@InputType()
export class UpdateCommentInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => String, { nullable: true })
  userId?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  postId?: MongooseSchema.Types.ObjectId;
}

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  content: string;

  @Field(() => String)
  userId: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  postId: MongooseSchema.Types.ObjectId;
}

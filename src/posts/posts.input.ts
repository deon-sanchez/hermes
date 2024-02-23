import { InputType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class FindPostsInput {
  @Field(() => String)
  categoryId?: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  userId?: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  commentId?: MongooseSchema.Types.ObjectId;
}

@InputType()
export class FindPostInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
}

@InputType()
export class CreatePostsInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;
}

@InputType()
export class UpdatePostsInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  content?: string;
}

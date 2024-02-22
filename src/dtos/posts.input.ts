import { InputType, Field, ID } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType({
  description: 'Find posts',
})
export class FindPostsInput {
  @Field(() => String, { nullable: true })
  _id?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  userId?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  categoryId?: MongooseSchema.Types.ObjectId;
}

@InputType({ description: 'Create a post' })
export class CreatePostInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  categoryId: string;
}

@InputType()
export class UpdatePostInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => String, { nullable: true })
  userId?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  categoryId?: MongooseSchema.Types.ObjectId;
}

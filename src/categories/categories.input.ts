import { InputType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class FindCategoriesInput {
  @Field(() => String, { nullable: true })
  postId?: MongooseSchema.Types.ObjectId;
}

@InputType()
export class FindCategoryInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
}

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  postId: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  postId: MongooseSchema.Types.ObjectId;
}

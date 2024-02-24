import { InputType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class FindCategoryInput {
  @Field()
  _id: MongooseSchema.Types.ObjectId;
}

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;

  @Field()
  description: string;
}

@InputType()
export class UpdateCategoryInput {
  @Field()
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  name: string;

  @Field()
  description: string;
}

import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class FindCategoryInput {
  @Field()
  _id: MongooseSchema.Types.ObjectId;
}

@InputType()
export class CreateCategoryInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  description: string;
}

@InputType()
export class UpdateCategoryInput {
  @Field()
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  description: string;
}

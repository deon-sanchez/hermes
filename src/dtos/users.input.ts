import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class FindUserInput {
  @Field(() => String)
  @IsMongoId()
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

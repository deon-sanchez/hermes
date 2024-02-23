import { InputType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class FindBlogsInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
}

@InputType()
export class CreateBlogsInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;
}

@InputType()
export class UpdateBlogsInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  content?: string;
}

import { InputType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class FindCommentsInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
}

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  content: string;
}

@InputType()
export class UpdateCommentInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  content?: string;
}

import { InputType, Field } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class FindCommentsInput {
  @Field(() => String)
  @IsMongoId()
  _id: MongooseSchema.Types.ObjectId;
}

@InputType()
export class UpdateCommentInput {
  @Field(() => String)
  @IsMongoId()
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  content?: string;
}

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  content: string;
}

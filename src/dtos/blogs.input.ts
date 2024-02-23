import { InputType, Field } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

@InputType({
  description: 'Find blogs',
})
export class FindBlogsInput {
  @Field(() => String)
  @IsMongoId()
  _id: MongooseSchema.Types.ObjectId;
}

@InputType({ description: 'Create a Blogs' })
export class CreateBlogsInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;
}

@InputType()
export class UpdateBlogsInput {
  @Field(() => String)
  @IsMongoId()
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  content?: string;
}

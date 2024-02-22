import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType({ description: 'Comments Response' })
@Schema({ timestamps: true })
export class CommentsModel {
  @Field((type) => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field((type) => String)
  @Prop({ type: String, required: true })
  content: string;

  @Field((type) => String)
  @Prop({ type: String, required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Field((type) => String)
  @Prop({ type: String, required: true })
  postId: MongooseSchema.Types.ObjectId;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}

export const CommentsSchema = SchemaFactory.createForClass(CommentsModel);
export type CommentsDocument = CommentsModel & Document;

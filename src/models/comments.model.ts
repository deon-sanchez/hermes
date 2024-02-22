import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TimestampModel } from './timestamp.model';

@ObjectType({ description: 'Comments Response' })
@Schema({ timestamps: true })
export class CommentsModel extends TimestampModel {
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
}

export const CommentsSchema = SchemaFactory.createForClass(CommentsModel);
export type CommentsDocument = CommentsModel & Document;

import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentsDocument = CommentsModel & Document;

@ObjectType({ description: 'Comments Response' })
@Schema()
export class CommentsModel extends Document {
  @Field((type) => String)
  @Prop({ type: String })
  _id: string;

  @Field((type) => String)
  @Prop({ type: String })
  content: string;

  @Field((type) => String)
  @Prop({ type: String })
  userId: string;

  @Field((type) => String)
  @Prop({ type: String })
  postId: string;

  @Field((type) => String)
  @Prop({ type: String })
  createdAt: string;

  @Field((type) => String)
  @Prop({ type: String })
  updatedAt: string;
}

export const CommentsSchema = SchemaFactory.createForClass(CommentsModel);

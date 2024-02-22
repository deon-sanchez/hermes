import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType({ description: 'Comments Response' })
@Schema({ timestamps: true })
export class CommentsModel {
  @Field((type) => String)
  @Prop({ type: String, required: true })
  _id: string;

  @Field((type) => String)
  @Prop({ type: String, required: true })
  content: string;

  @Field((type) => String)
  @Prop({ type: String, required: true })
  userId: string;

  @Field((type) => String)
  @Prop({ type: String, required: true })
  postId: string;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}

export const CommentsSchema = SchemaFactory.createForClass(CommentsModel);
export type CommentsDocument = CommentsModel & Document;

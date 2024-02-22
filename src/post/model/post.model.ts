import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = PostModel & Document;

@ObjectType({ description: 'Post Response' })
@Schema()
export class PostModel extends Document {
  @Field((type) => String)
  _id: string;

  @Field((type) => String)
  @Prop({ type: String })
  user: string;
}

export const PostSchema = SchemaFactory.createForClass(PostModel);

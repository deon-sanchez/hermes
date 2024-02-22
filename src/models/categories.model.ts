import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TimestampModel } from './timestamp.model';

@ObjectType({ description: 'Categories Response' })
@Schema({ timestamps: true })
export class CategoriesModel extends TimestampModel {
  @Field((type) => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field((type) => String)
  @Prop({ type: String, required: true })
  name: string;

  @Field((type) => String)
  @Prop({ type: String, required: true })
  description: string;
}

export const CategoriesSchema = SchemaFactory.createForClass(CategoriesModel);
export type CategoriesDocument = CategoriesModel & Document;

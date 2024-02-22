import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType({ description: 'Categories Response' })
@Schema({ timestamps: true })
export class CategoriesModel {
  @Field((type) => String)
  @Prop({ type: String, required: true })
  _id: string;

  @Field((type) => String)
  @Prop({ type: String, required: true })
  name: string;

  @Field((type) => String)
  @Prop({ type: String, required: true })
  description: string;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}

export const CategoriesSchema = SchemaFactory.createForClass(CategoriesModel);
export type CategoriesDocument = CategoriesModel & Document;

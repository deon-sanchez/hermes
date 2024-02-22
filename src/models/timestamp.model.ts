import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Timestamp Response' })
export class TimestampModel {
  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}

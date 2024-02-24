import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class FindUsersInput {
  @Field()
  postId: MongooseSchema.Types.ObjectId;

  @Field()
  commentId: MongooseSchema.Types.ObjectId;
}

export class FindUserInput {
  @Field()
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  email: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase())
  email: string;

  @Field()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}

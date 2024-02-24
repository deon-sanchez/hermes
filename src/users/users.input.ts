import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

/*
  This regex is used for validating strings to ensure they meet specific criteria, making it ideal for password validation. It enforces the following rules:

  1. The string must not start with a dot (.) or a newline character.
  2. The string must contain at least one uppercase letter (A-Z).
  3. The string must contain at least one lowercase letter (a-z).
  4. The string must include at least one digit (0-9) OR one special character (anything that's not a letter or digit).

  This ensures that the string is complex enough for secure applications, like passwords, by requiring a mix of character types.
*/
const PASSWORD_REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

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
  @Matches(PASSWORD_REGEX, {
    message: 'password too weak',
  })
  password: string;
}

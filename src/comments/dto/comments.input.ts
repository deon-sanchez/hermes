import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateCommentInput {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => String, { nullable: true })
  postId?: string;
}

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  content: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  postId: string;
}

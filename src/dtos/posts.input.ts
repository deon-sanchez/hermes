import { InputType, Field, ID } from '@nestjs/graphql';

@InputType({ description: 'Find one post by post id or user id' })
export class FindPostInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  userId?: string;
}

@InputType({
  description: 'Find all posts or find all post by user id or category id',
})
export class FindPostsInput {
  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => String, { nullable: true })
  categoryId?: string;
}

@InputType({ description: 'Create a post' })
export class CreatePostInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  categoryId: string;
}

@InputType()
export class UpdatePostInput {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => String, { nullable: true })
  categoryId?: string;
}

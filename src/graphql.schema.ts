
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateCategoryInput {
    name: string;
    description?: Nullable<string>;
}

export class UpdateCategoryInput {
    _id: string;
    name: string;
    description?: Nullable<string>;
}

export class FindCategoryInput {
    _id: string;
}

export class CreateCommentInput {
    postId: string;
    userId: string;
    content: string;
}

export class UpdateCommentInput {
    _id: string;
    content: string;
}

export class FindCommentInput {
    _id: string;
}

export class FindCommentsInput {
    postId?: Nullable<string>;
    userId?: Nullable<string>;
}

export class CreatePostInput {
    title: string;
    content: string;
    userId: string;
    categoryId: string;
}

export class UpdatePostInput {
    _id: string;
    title: string;
    content: string;
}

export class FindPostInput {
    _id: string;
}

export class FindPostsInput {
    categoryId?: Nullable<string>;
    userId?: Nullable<string>;
    commentId?: Nullable<string>;
}

export class CreateUserInput {
    name: string;
    email: string;
    password: string;
}

export class FindUserInput {
    _id: string;
    email?: Nullable<string>;
}

export class FindUsersInput {
    postId?: Nullable<string>;
    commentId?: Nullable<string>;
}

export class Categories {
    _id: string;
    name: string;
    description?: Nullable<string>;
    createdAt: DateTime;
    updatedAt: DateTime;
    posts: Posts[];
}

export abstract class IQuery {
    abstract categories(): Categories[] | Promise<Categories[]>;

    abstract category(findCategoryInput: FindCategoryInput): Categories | Promise<Categories>;

    abstract comments(findCommentInput?: Nullable<FindCommentInput>): Comments[] | Promise<Comments[]>;

    abstract comment(findCommentsInput: FindCommentsInput): Comments | Promise<Comments>;

    abstract posts(): Posts[] | Promise<Posts[]>;

    abstract post(findPostInput: FindPostInput): Posts | Promise<Posts>;

    abstract users(findUsersInput?: Nullable<FindUsersInput>): Users[] | Promise<Users[]>;

    abstract user(findUserInput: FindUserInput): Users | Promise<Users>;
}

export abstract class IMutation {
    abstract createCategory(createCategoryInput: CreateCategoryInput): Categories | Promise<Categories>;

    abstract updateCategory(updateCategoryInput: UpdateCategoryInput): Categories | Promise<Categories>;

    abstract deleteCategory(_id: string): Categories | Promise<Categories>;

    abstract createComment(createCommentInput: CreateCommentInput): Comments | Promise<Comments>;

    abstract updateComment(updateCommentInput: UpdateCommentInput): Comments | Promise<Comments>;

    abstract deleteComment(_id: string): Comments | Promise<Comments>;

    abstract createPost(createPostInput: CreatePostInput): Posts | Promise<Posts>;

    abstract updatePost(updatePostInput: UpdatePostInput): Posts | Promise<Posts>;

    abstract deletePost(_id: string): Posts | Promise<Posts>;

    abstract createUser(createUserInput: CreateUserInput): Users | Promise<Users>;
}

export class Comments {
    _id: string;
    postId: string;
    userId: string;
    content: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    user: Users;
    post: Posts;
}

export class Posts {
    _id: string;
    categoryId: string;
    userId: string;
    title: string;
    content: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class PostsRelationships {
    users: Users[];
    comments: Comments[];
    categories: Categories[];
}

export class Users {
    _id: string;
    name: string;
    email: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    comments: Comments[];
    posts: Posts[];
}

export type DateTime = any;
type Nullable<T> = T | null;

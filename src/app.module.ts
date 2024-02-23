import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

import { BlogsModule } from 'src/modules/blogs/blogs.module';
import { UsersModule } from 'src/modules/users/users.module';
import { CategoriesModule } from 'src/modules/categories/categories.module';
import { CommentsModule } from 'src/modules/comments/comments.module';

@Module({
  imports: [
    // Global configuration module for environment variables
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),

    // Database module setup with async configuration
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),

    // GraphQL module setup with async configuration
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      introspection: true,
      cache: 'bounded',
    }),

    // Importing the modules
    BlogsModule,
    CommentsModule,
    UsersModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

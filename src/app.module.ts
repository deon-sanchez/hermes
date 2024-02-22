import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PostsModule } from './Posts/Posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsResolver } from './comments/comments.resolver';
import { CommentsService } from './comments/comments.service';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { CategoriesResolver } from './categories/categories.resolver';
import { CategoriesService } from './categories/categories.service';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    // Global configuration module for environment variables
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    // Database module setup with async configuration
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),

    // GraphQL module setup with async configuration
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async (configService: ConfigService) => ({
        autoSchemaFile: 'src/schema.gql',
        cors: {
          credentials: true,
          origin: true,
        },
        sortSchema: true,
        debug: configService.get<boolean>('DEBUG'),
        context: ({ req, res }) => ({ req, res }),
        playground: {
          settings: {
            'request.credentials': 'include',
          },
        },
      }),
      inject: [ConfigService],
    }),
    PostsModule,
    CommentsModule,
    UsersModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [CommentsResolver, CommentsService, CategoriesResolver, CategoriesService],
})
export class AppModule {}

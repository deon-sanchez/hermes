import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PostModule } from './post/post.module';
import { MongooseModule } from '@nestjs/mongoose';

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
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

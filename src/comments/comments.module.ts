import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { Comments, CommentsSchema } from 'src/comments/comments.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: CommentsSchema,
        name: Comments.name,
      },
    ]),
  ],
  providers: [CommentsService, CommentsResolver],
  exports: [CommentsService],
})
export class CommentsModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { Categories, CategoriesSchema } from 'src/models/categories.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: CategoriesSchema,
        name: Categories.name,
      },
    ]),
  ],
  providers: [CategoriesService, CategoriesResolver],
  exports: [CategoriesService],
})
export class CategoriesModule {}

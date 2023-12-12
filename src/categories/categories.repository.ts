import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { db } from 'src/helpers/db';
import { v4 as uuid } from 'uuid';
import { Category } from './category.entity';

@Injectable()
export class CategoriesRepository {
  addCategory(name: string) {
    return db.push('/categories[]', { id: uuid(), name }, true);
  }

  async getAllCategories() {
    try {
      const allCategories: Category[] = await db.getData('/categories');
      return allCategories;
    } catch (err) {
      throw new InternalServerErrorException(
        'An error occured while fetching categories',
      );
    }
  }
}

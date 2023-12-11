import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { db } from 'src/main';
import { customAlphabet } from 'nanoid';
import { Category } from './category.entity';

const alphabet = '123456789';
const nanoid = customAlphabet(alphabet, 3);

@Injectable()
export class CategoriesRepository {
  addCategory(name: string) {
    const newCategory: Category = { id: Number(nanoid()), name };
    return db.push('/categories[]', newCategory, true);
  }

  async getAllCategories() {
    try {
      const allCategories = await db.getData('/categories');
      return allCategories;
    } catch (err) {
      throw new InternalServerErrorException(
        'An error occured while fetching categories',
      );
    }
  }
}

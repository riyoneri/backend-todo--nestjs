import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { db } from 'src/helpers/db';
import { v4 as uuid } from 'uuid';
import { Category } from './category.entity';
import { Task } from 'src/tasks/task.entity';

@Injectable()
export class CategoriesRepository {
  addCategory(name: string) {
    return db.push('/categories[]', { id: uuid(), name }, true);
  }

  async getAllCategories() {
    try {
      return await db.getData('/categories');
    } catch (err) {
      throw new InternalServerErrorException(
        'An error occured while fetching categories',
      );
    }
  }

  async deleteCategory(id: string) {
    try {
      const category: Category = await db.find(
        '/categories',
        (category: Category) => category.id === id,
      );

      if (!category) throw new NotFoundException('Category not found');

      const categoryTask = await db.find(
        '/tasks',
        (task: Task) => task.category === category.id,
      );

      if (categoryTask)
        throw new ConflictException(
          'Category is being used by one or more tasks',
        );

      const categoryIndex = await db.getIndex('/categories', category.id);

      return await db.delete(`/categories[${categoryIndex}]`);
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException('Something went wrong!');
    }
  }
}

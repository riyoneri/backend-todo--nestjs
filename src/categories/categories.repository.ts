import { Injectable } from '@nestjs/common';
import { db } from '../helpers/db';
import { Category } from './category.entity';
import { Task } from 'src/tasks/task.entity';

@Injectable()
export class CategoriesRepository {
  async addCategory(category: Category) {
    return await db.push('/categories[]', category, true);
  }

  async getAllCategories(): Promise<Category[]> {
    return await db.getData('/categories');
  }

  async findOne(id: string) {
    return await db.find<Category>(
      '/categories',
      (category: Category) => category.id === id,
    );
  }

  async findTask(id: string) {
    return await db.find<Task>('/tasks', (task: Task) => task.category === id);
  }

  async findCategoryIndex(id: string) {
    return await db.getIndex('/categories', id);
  }

  async deleteCategory(id: string) {
    return await db.delete(`/categories[${id}]`);
  }
}

import {
  Injectable,
  ConflictException,
  HttpException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { v4 as uuid } from 'uuid';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async createCategory(name: string) {
    try {
      const category: Category = { id: uuid(), name };
      return await this.categoriesRepository.addCategory(category);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  async getAllCategories() {
    try {
      return await this.categoriesRepository.getAllCategories();
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  async deleteCategory(id: string) {
    try {
      const category: Category = await this.categoriesRepository.findOne(id);

      if (!category) throw new NotFoundException('Category not found');

      const categoryTask = await this.categoriesRepository.findTask(
        category.id,
      );

      if (categoryTask)
        throw new ConflictException(
          'Category is being used by one or more tasks',
        );

      const categoryIndex = await this.categoriesRepository.findCategoryIndex(
        category.id,
      );

      return await this.categoriesRepository.deleteCategory(
        String(categoryIndex),
      );
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Something went wrong!');
    }
  }
}

import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  createCategory(name: string) {
    return this.categoriesRepository.addCategory(name);
  }

  getAllCategories() {
    return this.categoriesRepository.getAllCategories();
  }

  deleteCategory(id: string) {
    return this.categoriesRepository.deleteCategory(id);
  }
}

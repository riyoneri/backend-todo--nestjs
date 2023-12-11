import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesRepository {
  getAllCategories() {
    return 'getting all categories';
  }
}

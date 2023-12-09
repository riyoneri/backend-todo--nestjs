import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  createCategory(@Body() body: CreateCategoryDto) {
    return this.categoriesService.createCategory(body.name);
  }

  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }
}

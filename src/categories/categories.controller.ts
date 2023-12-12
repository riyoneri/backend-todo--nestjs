import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Missing body configurations',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  createCategory(@Body() body: CreateCategoryDto) {
    return this.categoriesService.createCategory(body.name);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'All categories',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }
}

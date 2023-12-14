import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
    description: 'Request was successfull',
  })
  @ApiResponse({
    status: 400,
    description: 'Missing body configurations',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  createCategory(@Body() { name }: CreateCategoryDto) {
    return this.categoriesService.createCategory(name);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Request was successfull',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Request was successfull',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Category is being used by one or more tasks',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }
}

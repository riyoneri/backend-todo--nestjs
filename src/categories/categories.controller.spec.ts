import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  const fakeController: Partial<CategoriesService> = {
    createCategory: () => Promise.resolve(),
    getAllCategories: () => Promise.resolve([]),
    deleteCategory: () => Promise.resolve(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [{ provide: CategoriesService, useValue: fakeController }],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create category', async () => {
    const createdCategory = await controller.createCategory({ name: 'Work' });

    expect(createdCategory).toBeUndefined();
  });

  it('should get all categories', async () => {
    const allCategories = await controller.getAllCategories();

    expect(allCategories).toBeInstanceOf(Array);
  });

  it('should delete category', async () => {
    const deletedCategory = await controller.deleteCategory('2');

    expect(deletedCategory).toBeUndefined();
  });
});

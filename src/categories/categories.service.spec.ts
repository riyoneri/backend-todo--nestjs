import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';
import { Category } from './category.entity';

describe('CategoriesService', () => {
  let service: CategoriesService;
  const fakeCategoriesRepository: Partial<CategoriesRepository> = {
    addCategory: () => Promise.resolve(),
    getAllCategories: (): Promise<Category[]> =>
      Promise.resolve([{ id: '1', name: 'Work' }]),
    deleteCategory: () => Promise.resolve(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: CategoriesRepository, useValue: fakeCategoriesRepository },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create category', async () => {
    const addedCategory = await service.createCategory('Work');
    expect(addedCategory).toBeUndefined();
  });

  it('should get all categories', async () => {
    const allCategories = await service.getAllCategories();

    expect(allCategories).toBeInstanceOf(Array);
  });

  it('should delete category', async () => {
    const deletedCategory = await service.deleteCategory('1');
    expect(deletedCategory).toBeUndefined();
  });
});

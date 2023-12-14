import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';
import { Category } from './category.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Status } from '../tasks/task.entity';

describe('CategoriesService', () => {
  let service: CategoriesService;
  const fakeCategoriesRepository: Partial<CategoriesRepository> = {
    addCategory: () => Promise.resolve(),
    getAllCategories: (): Promise<Category[]> =>
      Promise.resolve([{ id: '1', name: 'Work' }]),
    deleteCategory: () => Promise.resolve(),
    findOne: (id) => Promise.resolve({ id, name: 'Category name' }),
    findTask: (id) =>
      Promise.resolve({
        id,
        category: '1',
        description: 'Task description',
        status: Status.OPEN,
        title: 'My task',
      }),
    findCategoryIndex: (id) => Promise.resolve(+id),
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

  describe('DeleteCategory', () => {
    jest.spyOn(fakeCategoriesRepository, 'findOne').mockReturnValueOnce(null);

    it('should return 404 when not category found', async () => {
      try {
        await service.deleteCategory('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    jest.spyOn(fakeCategoriesRepository, 'findTask').mockReturnValueOnce(null);

    it('should delete category', async () => {
      const deletedCategory = await service.deleteCategory('1');
      console.log(deletedCategory);
      expect(deletedCategory).toBeUndefined();
    });

    it('should return 409 when category is being used by task', async () => {
      try {
        await service.deleteCategory('1');
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });
  });
});

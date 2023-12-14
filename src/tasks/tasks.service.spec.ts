import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './task.repository';
import { Status } from './task.entity';
import {
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CategoriesModule } from '../categories/categories.module';

describe('TasksService', () => {
  let service: TasksService;
  const fakeTasksRepository: Partial<TasksRepository> = {
    getAllTasks: () => Promise.resolve([]),
    findOne: (id: string) =>
      Promise.resolve({
        id: `${id}`,
        category: '1',
        description: 'Task description',
        status: Status.OPEN,
        title: 'My task',
      }),
    createtask: () => Promise.resolve(),
    deleteTask: () => Promise.resolve(),
    findCategory: (id) => Promise.resolve({ id, name: 'category name' }),
    getTaskIndex: (id) => Promise.resolve(+id),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useValue: fakeTasksRepository },
      ],
      imports: [CategoriesModule],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all tasks', async () => {
    const tasks = await service.getAllTasks();

    expect(tasks).toBeInstanceOf(Array);
  });

  describe('RetrieveTask', () => {
    it('should get one task', async () => {
      const task = await service.getOneTask('1');

      expect(task).toBeDefined();
    });

    it('should return 404 when no task found', async () => {
      jest.spyOn(fakeTasksRepository, 'findOne').mockReturnValueOnce(undefined);
      try {
        await service.getOneTask('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should return internal server error when error occurs', async () => {
      jest.spyOn(service, 'getOneTask').mockReturnValueOnce(null);
      try {
        await service.getOneTask('1');
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('CreateTask', () => {
    it('should create task', async () => {
      const task = await service.createTask({
        category: '1',
        description: 'Task description',
        title: 'My task',
      });

      expect(task).toBeUndefined();
    });

    it('should give 403 when creating task with invalid category id', async () => {
      jest.spyOn(fakeTasksRepository, 'findCategory').mockReturnValueOnce(null);

      try {
        await service.createTask({
          category: '1',
          description: 'Task description',
          title: 'My task',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
      }
    });
  });

  it('should delete task', async () => {
    const deletedTask = await service.deleteTask('1');

    expect(deletedTask).toBeUndefined();
  });
});

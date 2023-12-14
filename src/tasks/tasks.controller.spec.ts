import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Status, Task } from './task.entity';

describe('TasksController', () => {
  let controller: TasksController;
  const fakeService: Partial<TasksService> = {
    getAllTasks: () => Promise.resolve([]),
    getOneTask: (): Promise<Task> =>
      Promise.resolve({
        id: '1',
        title: 'Task title',
        status: Status.DONE,
        category: '1',
        description: 'This is category description',
      }),
    createTask: () => Promise.resolve(),
    deleteTask: () => Promise.resolve(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: fakeService }],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all tasks', async () => {
    const allTasks = await controller.getAllTasks();

    expect(allTasks).toBeInstanceOf(Array);
  });

  it('should get one task', async () => {
    const task = await controller.getOneTask('1');

    expect(task).toEqual({
      id: '1',
      title: 'Task title',
      status: Status.DONE,
      category: '1',
      description: 'This is category description',
    });
  });

  it('should create task', async () => {
    const createTask = await controller.createTask({
      category: '1',
      description: 'Task description',
      title: 'My task',
    });

    expect(createTask).toBeUndefined();
  });

  it('should delete task', async () => {
    const deletedTask = await controller.deleteTask('1');

    expect(deletedTask).toBeUndefined();
  });
});

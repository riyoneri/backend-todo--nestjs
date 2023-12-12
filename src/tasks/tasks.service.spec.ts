import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './task.repository';
import { Status } from './task.entity';

describe('TasksService', () => {
  let service: TasksService;
  const fakeTasksRepository: Partial<TasksRepository> = {
    getAllTasks: () => Promise.resolve([]),
    getOneTask: (id: string) =>
      Promise.resolve({
        id: `${id}`,
        category: '1',
        description: 'Task description',
        status: Status.OPEN,
        title: 'My task',
      }),
    createtask: () => Promise.resolve(),
    deleteTask: () => Promise.resolve(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useValue: fakeTasksRepository },
      ],
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

  it('should get one task', async () => {
    const task = await service.getOneTask('1');

    expect(task).toBeDefined();
  });

  it('should create task', async () => {
    const task = await service.createTask({
      category: '1',
      description: 'Task description',
      title: 'My task',
    });

    expect(task).toBeUndefined();
  });

  it('should delete task', async () => {
    const deletedTask = await service.deleteTask('1');

    expect(deletedTask).toBeUndefined();
  });
});

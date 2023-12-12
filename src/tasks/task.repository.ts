import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { db } from '../helpers/db';
import { Status, Task } from './task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { v4 as uuid } from 'uuid';
import { Category } from 'src/categories/category.entity';

@Injectable()
export class TasksRepository {
  async getAllTasks() {
    try {
      return await db.getData('/tasks');
    } catch (err) {
      throw new InternalServerErrorException(
        'An error occured while fetching tasks',
      );
    }
  }

  async getOneTask(id: string) {
    try {
      const task = await db.find('/tasks', (task: Task) => task.id === id);

      if (!task) throw new NotFoundException('Task not found');

      return task;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  async createtask(body: CreateTaskDto) {
    try {
      const category = await db.find(
        '/categories',
        (category: Category) => category.id === body.category,
      );

      if (!category) throw new ForbiddenException('Invalid category id');

      db.push('/tasks[]', { id: uuid(), ...body, status: Status.OPEN }, true);
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  async deleteTask(id: string) {
    try {
      const taskIndex = await db.getIndex('/tasks', id, 'id');
      if (taskIndex < 0) throw new NotFoundException('Task not found');

      return await db.delete(`/tasks[${taskIndex}]`);
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException('Something went wrong!');
    }
  }
}

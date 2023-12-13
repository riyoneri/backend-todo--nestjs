import { Injectable } from '@nestjs/common';
import { db } from '../helpers/db';
import { Task } from './task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Category } from 'src/categories/category.entity';

@Injectable()
export class TasksRepository {
  async getAllTasks() {
    return await db.getData('/tasks');
  }

  async findOne(id: string) {
    return await db.find('/tasks', (task: Task) => task.id === id);
  }

  async findCategory(id: string) {
    return await db.find(
      '/categories',
      (category: Category) => category.id === id,
    );
  }

  async createCategory(category: Category) {
    return await db.push('/tasks[]', category, true);
  }

  async createtask(task: CreateTaskDto) {
    db.push('/tasks[]', task, true);
  }

  async getTaskIndex(id: string) {
    return await db.getIndex('/tasks', id);
  }

  async deleteTask(index: number) {
    return await db.delete(`/tasks[${index}]`);
  }
}

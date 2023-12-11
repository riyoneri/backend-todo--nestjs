import { Injectable, NotFoundException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { db } from 'src/main';
import { Task } from './task.entity';

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

  async getOneTask(id: number) {
    const data = await db.getData('/tasks');
    const task = data.find((data: Task) => data.id === id);

    if (!data) throw new NotFoundException('Task not found');
    if (!task) throw new NotFoundException('Task not found');

    return await db.getData(`/tasks`);
  }
}

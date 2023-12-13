import {
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TasksRepository } from './task.repository';
import { CreateTaskDto } from './dtos/create-task.dto';
import { v4 as uuid } from 'uuid';
import { Status } from './task.entity';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async getAllTasks() {
    try {
      return await this.tasksRepository.getAllTasks();
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  async getOneTask(id: string) {
    try {
      const task = await this.tasksRepository.findOne(id);

      if (!task) throw new NotFoundException('Task not found');

      return task;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  async createTask(body: CreateTaskDto) {
    try {
      const category = await this.tasksRepository.findCategory(body.category);
      if (!category) throw new ForbiddenException('Invalid category id');

      const task = {
        id: uuid(),
        ...body,
        status: Status.OPEN,
      };

      return this.tasksRepository.createtask(task);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  async deleteTask(id: string) {
    try {
      const taskIndex = await this.tasksRepository.getTaskIndex(id);
      if (taskIndex < 0) throw new NotFoundException('Task not found');

      return this.tasksRepository.deleteTask(taskIndex);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Something went wrong!');
    }
  }
}

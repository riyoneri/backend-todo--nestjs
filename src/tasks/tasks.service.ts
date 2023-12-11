import { Injectable } from '@nestjs/common';
import { TasksRepository } from './task.repository';
import { CreateTaskDto } from './dtos/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  getAllTasks() {
    return this.tasksRepository.getAllTasks();
  }

  getOneTask(id: number) {
    return this.tasksRepository.getOneTask(id);
  }

  createTask(body: CreateTaskDto) {
    return this.tasksRepository.createtask(body);
  }
}

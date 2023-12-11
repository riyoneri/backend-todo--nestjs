import { Injectable } from '@nestjs/common';
import { TasksRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  getAllTasks() {
    return this.tasksRepository.getAllTasks();
  }
}

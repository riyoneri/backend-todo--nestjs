import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getOneTask(@Param('id') id: string) {
    return this.tasksService.getOneTask(id);
  }

  @Post()
  createTask(@Body() body: CreateTaskDto) {
    return this.tasksService.createTask(body);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}

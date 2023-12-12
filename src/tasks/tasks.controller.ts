import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Request was successfull',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Request was successfull',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  getOneTask(@Param('id') id: string) {
    return this.tasksService.getOneTask(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Request was successfull',
  })
  @ApiResponse({
    status: 403,
    description: 'Category id does not exist',
  })
  @ApiResponse({
    status: 400,
    description: 'Request configuration is malinformed',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  createTask(@Body() body: CreateTaskDto) {
    return this.tasksService.createTask(body);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Request was successfull',
  })
  @ApiResponse({
    status: 404,
    description: 'Category id does not exist',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}

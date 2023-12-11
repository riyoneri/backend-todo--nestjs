import { Module } from '@nestjs/common';
import { TasksService } from './tasks/tasks.service';
import { CategoriesService } from './categories/categories.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesRepository } from './categories/categories.repository';
import { TasksRepository } from './tasks/task.repository';
import { TasksController } from './tasks/tasks.controller';

@Module({
  controllers: [CategoriesController, TasksController],
  providers: [
    TasksService,
    CategoriesService,
    CategoriesRepository,
    TasksRepository,
  ],
})
export class AppModule {}

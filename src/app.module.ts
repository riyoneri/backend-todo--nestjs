import { Module } from '@nestjs/common';
import { TasksService } from './tasks/tasks.service';
import { CategoriesService } from './categories/categories.service';
import { TasksModule } from './tasks/tasks.module';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesRepository } from './categories/categories.repository';

@Module({
  imports: [TasksModule],
  controllers: [CategoriesController],
  providers: [TasksService, CategoriesService, CategoriesRepository],
})
export class AppModule {}

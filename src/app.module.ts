import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksService } from './tasks/tasks.service';
import { CategoriesService } from './categories/categories.service';
import { CategoriesModule } from './categories/categories.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [CategoriesModule, TasksModule],
  controllers: [AppController],
  providers: [AppService, TasksService, CategoriesService],
})
export class AppModule {}

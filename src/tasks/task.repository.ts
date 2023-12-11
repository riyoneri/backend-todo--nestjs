import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { db } from 'src/main';

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
}

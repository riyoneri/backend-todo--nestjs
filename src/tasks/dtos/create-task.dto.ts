import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title of new task',
    default: 'Talk to assistant',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description of new task',
    default: 'Schedule meeting with assistant and talk to new clients',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Id of category in which task belongs to(uuid)',
    format: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    default: 'b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  })
  @IsUUID()
  category: string;
}

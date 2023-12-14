import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Name of new category to be added',
    default: 'Work',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

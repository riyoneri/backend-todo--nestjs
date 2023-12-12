import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Name of new category to be added',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

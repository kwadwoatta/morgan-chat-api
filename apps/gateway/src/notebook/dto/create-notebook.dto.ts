import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNotebookDto {
  @IsString()
  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'My Notebook',
    description: 'The name of the notebook',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'This is a notebook',
    description: 'The description of the notebook',
    required: false,
  })
  description?: string;
}

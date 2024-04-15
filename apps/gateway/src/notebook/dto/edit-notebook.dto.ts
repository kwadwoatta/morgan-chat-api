import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditNotebookDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    required: false,
    example: 'My Notebook',
    description: 'The name of the notebook',
  })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    example: 'This is a notebook',
    description: 'The description of the notebook',
  })
  description?: string;
}

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditNotebookDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

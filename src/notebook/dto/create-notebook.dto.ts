import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNotebookDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  // @IsArray()
  // @ArrayMinSize(0)
  // @ArrayMaxSize(10)
  // @IsUUID(undefined, { each: true })
  // documents: Set<string>;

  @IsString()
  @IsOptional()
  description?: string;
}

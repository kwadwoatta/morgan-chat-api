import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class EditNoteDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(10)
  @IsUUID(undefined, { each: true })
  documents: Set<string>;

  @IsString()
  @IsOptional()
  description?: string;
}

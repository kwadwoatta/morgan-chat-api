import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  name;

  @IsString()
  @IsUUID()
  authorId;

  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(10)
  @IsUUID(undefined, { each: true })
  documents: Set<string>;

  @IsString()
  @IsOptional()
  description?: string;
}

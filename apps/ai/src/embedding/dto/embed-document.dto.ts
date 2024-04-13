import { EmbedDocumentDto as Dto } from '@app/common';
import {
  IsNotEmpty,
  IsString,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

function IsUint8Array(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsUint8Array',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return value instanceof Uint8Array;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a Uint8Array`;
        },
      },
    });
  };
}

export class EmbedDocumentDto implements Dto {
  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsNotEmpty()
  @IsUint8Array()
  contentAsUint8Array: Uint8Array;
}

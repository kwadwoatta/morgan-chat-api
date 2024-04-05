import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class ValidateUUIDPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'param' && !value) {
      throw new BadRequestException(
        `The parameter ${metadata.data} must be provided`,
      );
    }

    if (metadata.type === 'param' && !isUUID(value)) {
      throw new BadRequestException('Invalid UUID');
    }
    return value;
  }
}

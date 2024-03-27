// timestamp-to-date.pipe.ts

import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class TimestampToDatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (metadata.type !== 'body') {
      return value; 
    }

    if (value && value.createdAt) {
      const timestamp = parseInt(value.createdAt, 10);
      if (isNaN(timestamp) || !isFinite(timestamp)) {
        throw new BadRequestException('Invalid timestamp');
      }
      value.createdAt = new Date(timestamp);
    }

    return value;
  }
}

import {
  PipeTransform,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  ValidationError,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

// "title": "How to train your dragon bar",
// "description": "Even wonder how? bar",
// "body": "You have to belive bar",
// "tagList": ["reactjs", "angularjs", "dragons"]
export class BackendValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const object = plainToInstance(metadata.metatype, value);
    if (typeof object !== 'object') {
      return value;
    }
    const errors = await validate(object);

    if (!errors.length) {
      return value;
    }

    throw new HttpException(
      { errors: this.formatError(errors) },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  formatError(errors: ValidationError[]) {
    return errors.reduce((acc, err) => {
      acc[err.property] = Object.values(err.constraints);
      return acc;
    }, {});
  }
}

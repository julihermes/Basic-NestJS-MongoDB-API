import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import * as MongooseError from 'mongoose/lib/error';
import { ExceptionMessage } from 'src/common/constants/exception.message';

@Catch(MongooseError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongooseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let error;

    switch (exception.name) {
      case 'DocumentNotFoundError': {
        error = {
          statusCode: HttpStatus.NOT_FOUND,
          message: ExceptionMessage.mongooseError.documentNotFoundError,
        };
        break;
      }
      case 'CastError': {
        error = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ExceptionMessage.mongooseError.castError,
          error: exception.message,
        };
        break;
      }
      case 'ValidationError': {
        error = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ExceptionMessage.mongooseError.ValidationError,
          error: exception.message,
        };
        break;
      }
      default: {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ExceptionMessage.mongooseError.defaultError,
          error: exception.message,
        };
        break;
      }
    }

    response.status(error.statusCode).json(error);
  }
}

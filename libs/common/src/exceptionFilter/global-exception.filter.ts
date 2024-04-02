import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
    HttpException,
  } from '@nestjs/common';
  import { Response } from 'express';
  
  @Catch()
  export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      
      let status = HttpStatus.INTERNAL_SERVER_ERROR; 
      console.log('exception', exception);
      let message: any;
      if (exception instanceof HttpException) {
        status = exception.getStatus(); 
    }
  
      if (exception instanceof HttpException) {
        message = exception.getResponse();
        // console.log('HttpException',message)
      } else {
        // console.log('internal server error')
        message = 'Internal Server Error';
      }
  
      if (!Array.isArray(message)) {
        message = [message?.message];
        console.log('isArray', message);
      }
      // console.log("bank",message)
      message = message.flat();
  
      response.status(status).json({
        value: {},
        error: true,
        messages: message,
      });
    }
  }
  
import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const correlationId = (request.headers['x-correlation-id'] as string) || '';

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Internal Server Error' };

    // Default error structure
    const errorBody: Record<string, unknown> = {
      type: 'about:blank', // Default per RFC 7807, can be customized
      title: 'Internal Server Error',
      status,
      detail: (exception as Record<string, unknown>).message || 'An unexpected error occurred.',
      instance: request.url,
      correlationId,
      timestamp: new Date().toISOString(),
    };

    // Refine based on Status
    if (status === HttpStatus.NOT_FOUND) {
      errorBody.type = 'https://api.salespad.com/problems/not-found';
      errorBody.title = 'Not Found';
    } else if (status === HttpStatus.BAD_REQUEST) {
      errorBody.type = 'https://api.salespad.com/problems/validation-error';
      errorBody.title = 'Validation Error';
    }

    // Handle "message" as object (ValidationPipe usually returns object with message array)
    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const resp = exceptionResponse as Record<string, unknown>;

      // If 'message' is an array, it's likely class-validator errors
      if (Array.isArray(resp.message)) {
        errorBody.detail = 'One or more fields are invalid.';
        errorBody.errors = resp.message.map((msg: string) => {
          // Determine field and code if possible, simple string parsing fallback
          // NestJS default ValidationPipe returns "property constraint" strings usually
          // This is a naive heuristic
          return { message: msg };
        });
      } else if (resp.message) {
        errorBody.detail = resp.message;
      }

      if (resp.error) errorBody.title = resp.error;
    }

    this.logger.error(
      `HTTP ${status} Error: ${JSON.stringify(errorBody)}`,
      exception instanceof Error ? exception.stack : '',
    );

    response.status(status).json(errorBody);
  }
}

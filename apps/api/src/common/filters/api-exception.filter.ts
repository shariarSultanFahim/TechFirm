import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger
} from "@nestjs/common";
import { Response } from "express";
import { ApiErrorResponse } from "@repo/types";

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApiExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal server error";
    let errorMessages: Array<{ path: string | number; message: string }> = [];

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === "string") {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === "object" && exceptionResponse !== null) {
        const res = exceptionResponse as Record<string, any>;
        message = res.message || exception.message;

        if (Array.isArray(res.message)) {
          // class-validator default formatted errors
          message = "Validation Error";
          errorMessages = res.message.map((msg: string) => {
            const parts = msg.split(" ");
            const path = parts[0] || "";
            return {
              path,
              message: msg
            };
          });
        } else if (res.errors && Array.isArray(res.errors)) {
          errorMessages = res.errors;
        }
      }
    } else if (exception && typeof exception === "object" && "name" in exception) {
      const err = exception as any;
      if (err.name === "ValidationError") {
        // Mongoose validation error
        statusCode = HttpStatus.BAD_REQUEST;
        message = "Database Validation Error";
        errorMessages = Object.keys(err.errors || {}).map((key) => ({
          path: key,
          message: err.errors[key]?.message || "Invalid value"
        }));
      } else if (err.code === 11000) {
        // Mongoose duplicate key error
        statusCode = HttpStatus.CONFLICT;
        const field = Object.keys(err.keyPattern || {})[0] || "field";
        message = `Duplicate field value entered: ${field}`;
        errorMessages = [
          {
            path: field,
            message: `${field} already exists`
          }
        ];
      } else {
        message = err.message || "An unexpected error occurred";
      }
    }

    if (statusCode >= 500) {
      this.logger.error(
        `[${statusCode}] ${message}`,
        exception instanceof Error ? exception.stack : JSON.stringify(exception)
      );
    }

    const isDevelopment = process.env.NODE_ENV !== "production";

    const errorPayload: ApiErrorResponse = {
      success: false,
      statusCode,
      message,
      ...(errorMessages.length > 0 ? { errorMessages } : {}),
      ...(isDevelopment && exception instanceof Error ? { stack: exception.stack } : {})
    };

    response.status(statusCode).json(errorPayload);
  }
}

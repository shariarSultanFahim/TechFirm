import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiResponse } from "@repo/types";

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((res) => {
        // If response is already formatted as ApiResponse or has data / message
        if (res && typeof res === "object" && ("data" in res || "message" in res)) {
          return {
            success: true,
            statusCode: res.statusCode || statusCode,
            message: res.message || "Request successful",
            data: res.data !== undefined ? res.data : res,
            ...(res.meta ? { meta: res.meta } : {}),
            ...(res.pagination ? { meta: res.pagination } : {})
          };
        }

        return {
          success: true,
          statusCode,
          message: "Request successful",
          data: res !== undefined ? res : null
        };
      })
    );
  }
}

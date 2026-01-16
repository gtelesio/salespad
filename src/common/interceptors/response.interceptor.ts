import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
} from '@nestjs/common';
import type { Request } from 'express';
import { map, type Observable } from 'rxjs';

export interface Response<T> {
  correlationId: string;
  data: T;
  meta: {
    timestamp: string;
    pagination?: unknown;
  };
  links?: unknown;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const req = context.switchToHttp().getRequest<Request>();
    const correlationId = (req.headers['x-correlation-id'] as string) || '';

    return next.handle().pipe(
      map((data) => {
        // Check if data already has the structure (data, meta, links) to avoid double wrapping?
        // simple heuristic: if data has 'data' and 'meta', assume it's pre-formatted (e.g. pagination).
        // BUT strict requirement: always populate correlationId and timestamp.

        let responseData = data;
        let meta = { timestamp: new Date().toISOString() };
        let links: Record<string, string> | undefined;

        if (data && (data.data || data.links)) {
          // It's likely a paginated response or pre-formatted from service/controller
          // If data.data exists, use it, otherwise use data itself (though logically if it has links/meta it should have data)
          responseData = data.data !== undefined ? data.data : data;
          if (data.meta) {
            meta = { ...meta, ...data.meta };
          }
          if (data.links) {
            links = data.links;
          }
        }

        return {
          correlationId,
          data: responseData,
          meta,
          links,
        };
      }),
    );
  }
}

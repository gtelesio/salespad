
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const correlationId = req.headers['x-correlation-id'] || uuidv4();

        // Normalize header to lowercase for internal usage if needed, but standard is keep original or specific.
        // We attach it to both request (for downstream) and response (for client).
        req.headers['x-correlation-id'] = correlationId;
        res.setHeader('X-Correlation-ID', correlationId);

        next();
    }
}

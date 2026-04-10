import { ResponseInterface } from '@libs/shared/interfaces';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<FastifyReply>();
    const req = ctx.getRequest<FastifyRequest>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const msg =
      exception instanceof HttpException ? exception.getResponse() : exception;

    this.logger.error('❌ Error Desde el filter exception:', msg);

    const response: ResponseInterface = {
      statusCode: (msg as any).statusCode || status,
      message: (msg as any).message || 'Internal server error',
      timestamps: new Date().toISOString(),
      error: (msg as any).error || null,
      path: req.url,
      data: null,
    };


    res.status(status).send(response);
  }
}

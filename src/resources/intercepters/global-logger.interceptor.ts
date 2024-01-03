import { 
  CallHandler, 
  ConsoleLogger, 
  ExecutionContext, 
  Injectable, 
  NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { RequestWithUser } from 'src/modules/authentication/authentication.guard';

@Injectable()
export class GlobalLoggerInterceptor implements NestInterceptor {
 
  constructor(private nativeLogger: ConsoleLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextHttp = context.switchToHttp();
    const request = contextHttp.getRequest<Request | RequestWithUser>();
    const response = contextHttp.getResponse<Response>();

    const { path, method } = request;
    const { statusCode } = response;

    this.nativeLogger.log(`${method} ${path} ${statusCode}`)

    const timestampPreController = Date.now();

    return next.handle().pipe(
      tap(() => {
        if ('user' in request){
          this.nativeLogger.log(`request made by user ${request.user?.sub}`)
        }
        const routeExecutionTime = Date.now() - timestampPreController;
        this.nativeLogger.log(`response: status ${statusCode} - ${routeExecutionTime}ms`)
      })
    );
  }
}

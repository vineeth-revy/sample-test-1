import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request,Response } from "express";

@Catch(HttpException)
export class CustomHTTPExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        return response.status(exception.getStatus()).json({
            msg:"This is a CustomExceptionFilter error",
            exceptionResponse:exception.getResponse(),
            timestamp:new Date().toISOString(),
            path:request.url,
            host:request.hostname
        })
    }
}
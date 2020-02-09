import { ExceptionFilter, Catch, NotFoundException } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
const path = require('path');
import { ArgumentsHost} from "@nestjs/common";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.sendFile(path.resolve('app-frontend/dist/index.html'));
    }
}
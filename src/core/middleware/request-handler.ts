import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RequestHandler implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request = context.switchToHttp().getRequest();

		//It will take string inputs and do the trimming of that string
		const inputs = [request.query, request.body, request.params];
		for (const input of inputs) {
			for (const key in input) {
				const value = input[key];
				if (typeof value === 'string' || value instanceof String) {
					input[key] = value.trim();
				}
			}
		}

		return next.handle();
	}
}

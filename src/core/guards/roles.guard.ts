import { DecoratorConstant } from '@app/core/constants/decorator.constant';
import { messages } from '@app/shared/messages.shared';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}
	canActivate(context: ExecutionContext): boolean {
		let roles = this.reflector.get<string[]>(DecoratorConstant.HAS_ROLES, context.getHandler());
		/*If API is not authorized return true always*/
		if (!roles || !roles.length) {
			return true;
		}
		roles = roles?.map((r) => r.toLowerCase());

		const req = context.switchToHttp().getRequest();

		if (!req.claims.RoleName || !roles.includes(req.claims.RoleName.toLowerCase())) {
			throw new HttpException(messages.E7, HttpStatus.FORBIDDEN);
		}

		return true;
	}
}

import { AppConfigService } from '@app/config/app-config.service';
import { messages } from '@app/shared/messages.shared';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { DecoratorConstant } from '../constants/decorator.constant';
import AppLogger from '../logger/app-logger';
import { AuthService } from '@app/modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly _logger: AppLogger,
		private readonly _appConfigSvc: AppConfigService,
		private readonly _jwtService: JwtService,
		private readonly _authService: AuthService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {
			const secured = this.reflector.get<string>(DecoratorConstant.SECURED, context.getHandler());

			/*If API is not authorized return true always*/
			if (!secured) {
				return true;
			}

			/*Extract bearer token from header and validate*/
			const request = context.switchToHttp().getRequest();
			let bearerToken = request.headers['authorization'];

			if (!bearerToken) {
				throw new HttpException('', HttpStatus.UNAUTHORIZED);
			}

			bearerToken = bearerToken.replace('Bearer', '').trim();
			if (!bearerToken || bearerToken.split('.').length !== 3) {
				throw new HttpException('', HttpStatus.UNAUTHORIZED);
			}

			const tokenMetadata = this._appConfigSvc.get('tokenMetadata'),
				jwtRes = await this._jwtService.verifyAsync(bearerToken, {
					secret: tokenMetadata.appAtSecret
				});

			if (!jwtRes) throw new HttpException('', HttpStatus.UNAUTHORIZED);
			// const resp = await this._authService.verifyToken(jwtRes.sid);
			// if (resp.code != HttpStatus.OK) throw new HttpException(resp.message, HttpStatus.UNAUTHORIZED);
			request.claims = jwtRes;

			return true;
		} catch (error) {
			this._logger.error(error.stack, HttpStatus.UNAUTHORIZED);
			throw new HttpException(messages.E3, HttpStatus.UNAUTHORIZED);
		}
	}
}

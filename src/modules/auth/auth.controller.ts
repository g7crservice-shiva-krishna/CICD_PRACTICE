import { Controller, Get } from '@nestjs/common';
import { AuthAbstractSvc } from './auth.abstract';
import { AppResponse } from '@app/shared/appresponse.shared';

@Controller('auth')
export class AuthController {
	constructor(private readonly _authService: AuthAbstractSvc) {}

	@Get('/check')
	async apiCheck(): Promise<AppResponse> {
		return await this._authService.check();
	}
}

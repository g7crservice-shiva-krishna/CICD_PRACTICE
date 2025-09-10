import AppLogger from '@app/core/logger/app-logger';
import { AbstractAuthDao } from '../abstract/auth.abstract';
import { AppResponse, createResponse } from '@app/shared/appresponse.shared';
import { HttpStatus } from '@nestjs/common';
import { messages } from '@app/shared/messages.shared';

export class AuthDao implements AbstractAuthDao {
	constructor(readonly _loggerSvc: AppLogger) {}

	async check(): Promise<AppResponse> {
		try {
			return createResponse(HttpStatus.OK, 'check successful');
		} catch (error) {
			this._loggerSvc.error(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
			return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.E2);
		}
	}
}

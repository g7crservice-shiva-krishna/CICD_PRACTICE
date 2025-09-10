import AppLogger from '@app/core/logger/app-logger';
import { DatabaseService } from '@app/database/database.service';
import { AbstractAuthDao } from '@app/database/mongo/abstract/auth.abstract';
import { AppResponse, createResponse } from '@app/shared/appresponse.shared';
import { messages } from '@app/shared/messages.shared';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
	private readonly _authTxn: AbstractAuthDao;
	constructor(
		readonly _dbSvc: DatabaseService,
		private readonly _loggerSvc: AppLogger
	) {
		this._authTxn = _dbSvc.authTxn;
	}

	async check(): Promise<AppResponse> {
		try {
			const response = await this._authTxn.check();
			if (response?.code !== HttpStatus.OK) {
				return response;
			}
			return createResponse(HttpStatus.OK, messages.S4, response.message);
		} catch (error) {
			this._loggerSvc.error(`Error in AuthService.check() :: ${error}`);
			return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.E2);
		}
	}
}

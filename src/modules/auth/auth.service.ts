import { HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from '@app/database/database.service';
import { AppResponse, createResponse } from '@app/shared/appresponse.shared';
import AppLogger from '@app/core/logger/app-logger';
import { messages } from '@app/shared/messages.shared';
import { join } from 'path';
import { readFileSync } from 'fs';
import { constants, privateDecrypt } from 'crypto';
import { AppConfigService } from '@app/config/app-config.service';
import { JwtService } from '@nestjs/jwt';
import { userSignIn, validateCredentials } from './models/user.model';
import { AtPayload } from './models/jwt.model';
import { Types } from 'mongoose';
import { unix_ts_now } from '@app/core/utils/timestamp-util';
import { AbstractAuthDao } from '@app/database/mongo/abstract/auth.abstract';

@Injectable()
export class AuthService {
	private readonly _authTxn: AbstractAuthDao;
	constructor(
		readonly _dbSvc: DatabaseService,
		private readonly _appConfigSvc: AppConfigService,
		private readonly _loggerSvc: AppLogger,
		private _jwtService: JwtService
	) {
		this._authTxn = _dbSvc.authTxn;
	}

	async check(): Promise<AppResponse> {
		try {
			let response = await this._authTxn.check();
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

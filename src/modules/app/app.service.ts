import { DatabaseService } from '@app/database/database.service';
import { AppResponse, createResponse } from '@app/shared/appresponse.shared';
import { messages } from '@app/shared/messages.shared';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	// private readonly _usermngTxn: UserManagementAbstractSqlDao;
	constructor(
		readonly _dbSvc: DatabaseService
		// @Inject(MsSqlConstants.SEQUELIZE_PROVIDER) private _sequelize: Sequelize
	) {
		// this._usermngTxn = _dbSvc._user_management_Txn;
	}
	async healthz(checkDatabase?: boolean): Promise<AppResponse> {
		try {
			if (checkDatabase) {
				// await this._sequelize.authenticate();
			}
			return createResponse(HttpStatus.OK, messages.S5);
		} catch (error) {
			return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.E9);
		}
	}
}

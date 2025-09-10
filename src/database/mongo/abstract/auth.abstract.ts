import { AppResponse } from '@app/shared/appresponse.shared';

export abstract class AbstractAuthDao {
	abstract check(): Promise<AppResponse>;
}

import { AppResponse } from '@app/shared/appresponse.shared';

export abstract class AuthAbstractSvc {
	abstract check(): Promise<AppResponse>;
}

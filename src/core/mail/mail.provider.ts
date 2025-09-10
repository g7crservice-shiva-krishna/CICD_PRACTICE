import AppLogger from '../logger/app-logger';
import { EmailClient } from '@azure/communication-email';
import { MailServiceConstant } from './mail.constant';
import { AppConfigService } from '@app/config/app-config.service';
import { MailProviders } from '../enums/mail.enum';
export const mailScvProvider = [
	{
		provide: MailServiceConstant.MAIL_SERVICE_PROVIDER,
		useFactory: async (configService: AppConfigService): Promise<any> => {
			const mailConfig = configService.get('mailConfig');
			if (mailConfig.mailScvProvider.toUpperCase() === MailProviders.AZURE_COMM_SVC) {
				const azureCommConfig = mailConfig.azureCommSvc;
				const client = new EmailClient(azureCommConfig.azureCommConnectionString);
				return client;
			}
			return null;
		},
		inject: [AppConfigService, AppLogger]
	}
];

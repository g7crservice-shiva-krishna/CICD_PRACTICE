import AppLogger from '@app/core/logger/app-logger';
import { DatabaseService } from '@app/database/database.service';
import { AppResponse, createResponse } from '@app/shared/appresponse.shared';
import { messages } from '@app/shared/messages.shared';
import { EmailClient, EmailMessage } from '@azure/communication-email';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { MailServiceConstant } from './mail.constant';

@Injectable()
export class AppMailService {
	@Inject(MailServiceConstant.MAIL_SERVICE_PROVIDER) private readonly _azMailService: EmailClient;
	constructor(
		private mailerService: MailerService,
		readonly _dbSvc: DatabaseService,
		readonly _loggerSvc: AppLogger
	) {}
	async prepareMailContentAndSend(mailOptions: any): Promise<AppResponse> {
		//let resFnRef: any;
		try {
			await this.mailerService.sendMail(mailOptions);
			//	resFnRef = createResponse(HttpStatus.OK, messages.S4);
		} catch (error) {
			this._loggerSvc.error(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
			//	resFnRef = createResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.E2);
		}
		return await this.logEmails();
	}

	async azCommunication(mailOptions: ISendMailOptions, mailConfig: any): Promise<AppResponse> {
		let resFnRef: any;
		try {
			let bcc: any;
			let cc: any;
			let to: any;
			let mailOpt: any = mailOptions;
			if (mailOptions.to) {
				to = mailOptions.to
					.toString()
					.split(',')
					.map((mail) => {
						return { address: mail };
					});
			}
			const message: EmailMessage = {
				senderAddress: mailConfig.azureCommSvc.sender,
				recipients: {
					to: to
				},
				content: {
					subject: mailOpt.subject,
					html: mailOpt.html.toString()
				}
			};
			if (mailOpt.bcc) {
				bcc = mailOpt.bcc
					.toString()
					.split(',')
					.map((item) => {
						return { address: item };
					});
				message.recipients.bcc = bcc;
			}
			if (mailOpt.cc) {
				cc = mailOpt.cc
					.toString()
					.split(',')
					.map((item) => {
						return { address: item };
					});
				message.recipients.cc = cc;
			}
			if (mailOpt.text) {
				message.content.plainText = mailOpt.text.toString();
			}

			mailOpt = mailOpt?.attachments?.length
				? (message.attachments = [
						...mailOpt.attachments.map((attachment) => {
							return {
								name: attachment.filename,
								contentType: attachment.contentType,
								contentInBase64: attachment.content.toString('base64')
							};
						})
					])
				: null;
			const poller = await this._azMailService.beginSend(message);
			await poller.pollUntilDone();
			resFnRef = createResponse(HttpStatus.OK, messages.S4);
		} catch (error) {
			this._loggerSvc.error(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
			resFnRef = createResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.E2);
		}
		if (resFnRef.code === HttpStatus.OK) {
			return await this.logEmails();
		}

		await this.logEmails();
		return resFnRef;
	}

	async logEmails(): Promise<AppResponse> {
		try {
			return createResponse(HttpStatus.OK, messages.S4);
		} catch (error) {
			this._loggerSvc.error(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
			return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.E2);
		}
	}
}

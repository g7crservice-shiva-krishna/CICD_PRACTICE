import { AppConfigService } from '@app/config/app-config.service';
import { HttpStatus, Injectable, LoggerService } from '@nestjs/common';
import { Logger, createLogger, format, transports } from 'winston';
import { extensions, winstonAzureBlob } from 'winston-azure-blob';
import { unix_ts_now } from '../utils/timestamp-util';

enum WinstonLogLevel {
	ERROR = 'error',
	WARN = 'warn',
	INFO = 'info',
	HTTP = 'http',
	VERBOSE = 'verbose',
	DEBUG = 'debug',
	SILLY = 'silly'
}

@Injectable()
export default class AppLogger implements LoggerService {
	public logger: Logger;
	private readonly loggerChannels = [];
	constructor(_appConfigSvc: AppConfigService) {
		const blobCred = _appConfigSvc.get('blobStorage'),
			loggerConfig = _appConfigSvc.get('logger'),
			{ combine, timestamp, label, json } = format,
			{ Console } = transports;

		this.loggerChannels.push(new Console());

		this.loggerChannels.push(
			winstonAzureBlob({
				account: {
					name: blobCred.blobAccountName,
					key: blobCred.blobAccountKey
				},
				containerName: blobCred.blobLoggerContainer,
				blobName: 'app-logs/new-project-api-logs-combined',
				rotatePeriod: 'YYYY-MM-DD',
				bufferLogSize: 1,
				eol: '\n',
				extension: extensions.LOG,
				syncTimeout: 0
			})
		);

		this.loggerChannels.push(
			winstonAzureBlob({
				account: {
					name: blobCred.blobAccountName,
					key: blobCred.blobAccountKey
				},
				containerName: blobCred.blobLoggerContainer,
				level: 'error',
				blobName: 'errors/new-project-api-errors',
				rotatePeriod: 'YYYY-MM-DD',
				bufferLogSize: 1,
				eol: '\n',
				extension: extensions.LOG,
				syncTimeout: 0
			})
		);

		const logFormat = combine(label({ label: 'new-project-api' }), timestamp({ format: () => unix_ts_now().toString() }), json());

		this.logger = createLogger({
			level: loggerConfig.logLevel || 'info',
			format: logFormat,
			transports: this.loggerChannels
		});
	}

	log(message: any, status = HttpStatus.OK, sid = '') {
		this.logger.log(WinstonLogLevel.INFO, { message, status, sid });
	}
	error(message: any, status = HttpStatus.INTERNAL_SERVER_ERROR, sid = '') {
		this.logger.log(WinstonLogLevel.ERROR, { message, status, sid });
	}
	warn(message: any, route = '', status = HttpStatus.PARTIAL_CONTENT, sid = '') {
		this.logger.log(WinstonLogLevel.WARN, { message, route, status, sid });
	}
	debug?(message: any, status = HttpStatus.OK, sid = '') {
		this.logger.log(WinstonLogLevel.DEBUG, { message, status, sid });
	}
	verbose?(message: any, status = HttpStatus.OK, sid = '') {
		this.logger.log(WinstonLogLevel.VERBOSE, { message, status, sid });
	}
}

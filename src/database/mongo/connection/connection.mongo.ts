import AppLogger from '@app/core/logger/app-logger';
import { Connection, createConnection } from 'mongoose';
import { messageFactory, messages } from 'src/shared/messages.shared';
import { MongoConstants } from './constants.mongo';
import { AppConfigService } from '@app/config/app-config.service';

export const mongoDbProvider = [
	{
		provide: MongoConstants.MONGO_DB_PROVIDER,
		useFactory: (configService: AppConfigService, _logger: AppLogger): Connection => {
			const dbCred = configService.get('db'),
				conn = createConnection(dbCred.mongo.uri, { autoCreate: false, autoIndex: false });

			// When successfully connected
			conn.on('connected', () => {
				_logger.log(messages.S3, 200);
			});

			// If the connection throws an error
			conn.on('error', (err) => {
				const serverCrashMsg = messageFactory(messages.E4, [err.message]);
				_logger.error(serverCrashMsg, 500);
			});

			// When the connection is disconnected
			conn.on('disconnected', () => {
				_logger.error(messages.E5, 500);
			});

			// If the Node process ends, close the Mongoose connection
			process.on('SIGINT', async () => {
				try {
					await conn.close();
					_logger.error(messages.E6, 500);
					process.exit(0); // Graceful exit
				} catch (err) {
					_logger.error(`Error closing connection: ${err.message}`, 500);
					process.exit(1); // Exit with failure code
				}
			});

			return conn;
		},
		inject: [AppConfigService, AppLogger]
	}
];

import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import * as cors from 'cors';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import { AppConfigService } from 'src/config/app-config.service';
import { shouldCompress } from './compressions/compression';
import { corsOptions } from './cors-config';
import AppLogger from './logger/app-logger';
import { ErrorHandler } from './middleware/error-handler';
import { ResponseHandler } from './middleware/response-handler';
import { setUpSwagger } from './swagger/doc.swagger';

/**
 * Core bootstrap module should be loaded here.
 * @param app
 *
 */

export default async function bootstrap(app: INestApplication, appConfigSvcObj: AppConfigService) {
	// Global Prefix
	app.setGlobalPrefix('api');

	//middlewares, express specific
	app.use(json({ limit: '50mb' }));
	app.use(urlencoded({ limit: '50mb', extended: true }));
	app.use(helmet());

	app.use(
		compression({
			filter: shouldCompress,
			threshold: 0
		})
	);

	// CORS configuration
	app.use(cors(corsOptions));

	// Auto-validation
	// We'll start by binding ValidationPipe at the application level, thus ensuring all endpoints are protected from receiving incorrect data.
	/*Global validation filters*/
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true
		})
	);

	// app.useWebSocketAdapter(new AuthSocketAdapter(app));

	// Bind Interceptors
	app.useGlobalInterceptors(new ResponseHandler());
	// app.useGlobalInterceptors(new RequestHandler());

	// Error Handler
	app.useGlobalFilters(new ErrorHandler(app.get(AppLogger)));

	//Swagger document
	const appConfig = appConfigSvcObj.get('app'),
		environment = appConfig.environment;

	if (environment && environment.toLowerCase() !== 'production') {
		setUpSwagger(app);
	}
}

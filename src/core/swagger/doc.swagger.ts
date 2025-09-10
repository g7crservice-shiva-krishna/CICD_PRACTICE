import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

export const setUpSwagger = (app: INestApplication) => {
	const config = new DocumentBuilder().setTitle(' DOCUMENTATION').setVersion('1.0').addBearerAuth().build(),
		swaggerDoc = SwaggerModule.createDocument(app, config),
		customOptions: SwaggerCustomOptions = {
			customSiteTitle: '',
			customCss: `.swagger-ui .topbar { background-color: #ffffff; border-bottom: 5px solid #3f51b5; }`
		};

	SwaggerModule.setup('api/docs/swagger', app, swaggerDoc, customOptions);
	//writeFileSync('./new-proj-spec.json', JSON.stringify(swaggerDoc));
};

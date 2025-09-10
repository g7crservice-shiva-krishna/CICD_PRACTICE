import { AppResponse } from '@app/shared/appresponse.shared';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('App')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('healthz')
	Healthz(@Query('checkDatabase') checkDatabase?: boolean): Promise<AppResponse> {
		return this.appService.healthz(Boolean(checkDatabase));
	}
}

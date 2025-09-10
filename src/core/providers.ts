import { DatabaseModule } from '@app/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from 'src/config/app-config.service';
import { AuthGuard } from './guards/authorization.guard';
import { RolesGuard } from './guards/roles.guard';
import AppLogger from './logger/app-logger';
import { AuthService } from '@app/modules/auth/auth.service';

const getProviders = (): any[] => {
		return [
			AppConfigService,
			AppLogger,
			{ provide: APP_GUARD, useClass: AuthGuard },
			{ provide: APP_GUARD, useClass: RolesGuard },
			JwtService,
			AuthService
		];
	},
	importProviders = (): any[] => {
		return [ConfigModule.forRoot({ envFilePath: '.env.dev' }), DatabaseModule];
	},
	exportProviders = (): any[] => {
		return [AppConfigService, AppLogger, DatabaseModule];
	};

export { exportProviders, getProviders, importProviders };

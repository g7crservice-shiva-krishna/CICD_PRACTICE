import { Module } from '@nestjs/common';
import { AuthAbstractSvc } from './auth.abstract';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
	controllers: [AuthController],
	providers: [
		{
			provide: AuthAbstractSvc,
			useClass: AuthService
		},
		JwtService
	]
})
export class AuthModule {}

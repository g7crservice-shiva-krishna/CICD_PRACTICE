import { DatabaseService } from '@app/database/database.service';
import { mongoDbProvider } from '@app/database/mongo/connection/connection.mongo';
import { mongoDbModelsProvider } from '@app/database/mongo/connection/models.connection.mongo';
import { Module } from '@nestjs/common';
import { AbstractAuthDao } from './mongo/abstract/auth.abstract';
import { AuthDao } from './mongo/dao/auth.dao';

@Module({
	providers: [
		...mongoDbProvider,
		...mongoDbModelsProvider,
		DatabaseService,
		{
			provide: AbstractAuthDao,
			useClass: AuthDao
		}
	],
	exports: [
		DatabaseService,
		{
			provide: AbstractAuthDao,
			useClass: AuthDao
		}
	]
})
export class DatabaseModule {}

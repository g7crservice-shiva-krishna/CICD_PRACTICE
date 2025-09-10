import { Injectable } from '@nestjs/common';
import { AbstractAuthDao } from './mongo/abstract/auth.abstract';

@Injectable()
export class DatabaseService {
	constructor(public authTxn: AbstractAuthDao) {}
}

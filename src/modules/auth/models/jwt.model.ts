import { Types } from 'mongoose';

interface AtPayload {
	readonly sub: string;
	readonly role: string;
	readonly sid: Types.ObjectId;
	readonly name: string;
	readonly ip_address: string;
}

interface RtPayload {
	readonly sub: string;
	readonly sid: string;
	// readonly username: string;
	readonly name: string;
}
export { AtPayload, RtPayload };

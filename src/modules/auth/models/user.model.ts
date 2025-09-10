interface userSignIn {
	agent_type: string;
	ip: string;
	username: string;
	password: string;
	regMode: string;
}
interface validateCredentials {
	username: string;
	password: string;
}

export { userSignIn, validateCredentials };

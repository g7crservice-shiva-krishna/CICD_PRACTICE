export function messageFactory(message: string, msgParams?: string[]): string {
	let newMsg = message;
	if (msgParams && msgParams.length > 0) {
		msgParams.forEach((val, key) => {
			newMsg = newMsg.split(`ARG${key}`).join(val?.toString());
		});
	}
	return newMsg;
}

//ARG0,ARG1 ... ARGn should be in sequence.

export const enum messages {
	//Genaral messages : Start with Gn
	G1 = 'G7CR NEW API',

	//Success messages : Start with Sn
	S1 = 'service is listening on ARG0.',
	S2 = 'service is up and running.',
	S3 = 'Connected to  db!',
	S4 = 'Success.',
	S5 = 'Application is up & running, Database is up & running',
	S6 = 'User created successfully',
	S7 = 'User deleted Successfully.',
	S10 = 'User updated successfully',
	S11 = 'Log out Successfully.',
	//Email Subject
	M1 = 'Acknowledgement of Selected Configurations',

	// Warning messages : Start with Wn
	W1 = 'Please provide a valid ARG0!',
	W2 = 'ARG0 should not be empty!',
	W3 = 'ARG0 should be a numeric value!',
	W4 = 'ARG0 should be a positive integer greater than zero.',
	W5 = 'ARG0 should be a string value.',
	W6 = 'ARG0 should not exceed more than ARG1 characters.',
	W7 = 'ARG0 should be a integer value.',
	W8 = 'Please provide at least one field to update!',
	W9 = 'ARG0 should be a positive integer and greater than zero.',
	W10 = 'ARG0 not found.',
	W11 = 'The date range must not be more than 1 year.',
	W12 = 'ARG0 should be a positive integer and less than ARG1.',
	W13 = 'No Budget found!',
	W14 = 'Budget already exist!',
	W15 = 'No scope found!',
	W16 = 'No User Found!',
	W17 = 'please provide a valid password. Note: To ensure your accounts safety, password must be encoded.',
	W18 = 'Password should be 8 to 16 characters with at least one special characters (!@#$%^&*?), one numeric, one small case and one upper case letter (i.e. Abcd@123).',
	W19 = `Login failed - Username or password you entered did not match our records. Please double-check your login credentials to ensure they are entered correctly.`,
	W20 = 'Password length should be between 8 and 16 characters.',
	W21 = 'Access token is not valid or expired!',
	W22 = 'Session not found',
	W23 = 'ARG0 should be ARG1.',
	W24 = 'Already exists!',

	//Error messages : Start with Subscription
	E1 = 'API service start failed! :: ARG0.',
	E2 = 'Oops! An error occurred while processing your request.',
	E3 = 'Unauthorized request!',
	E4 = 'An error occurred while establishing connection to MongoDB! (ERROR :: ARG0).',
	E5 = 'MongoDB database connection disconnected through app termination!',
	E6 = 'Error closing MongoDB database connection! (ERROR :: ARG0)!',
	E7 = 'We are sorry, but you do not have access to this resource!',
	E8 = 'We regret to inform you that an error occurred while authenticating your credentials. Please retry the authentication process!',
	E9 = 'Application or database is not running properly'
}

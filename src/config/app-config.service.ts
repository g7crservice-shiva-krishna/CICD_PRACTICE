export class AppConfigService {
	private readonly envConfig: { [key: string]: any } = {};

	constructor() {
		/*app configurations*/
		this.envConfig.app = {
			port: parseInt(process.env.APP_PORT, 10) || 8080,
			environment: process.env.ENVIRONMENT
		};

		/*database*/
		this.envConfig.db = {
			mongo: {
				uri: process.env.APP_CONNECTIONSTRING_MONGO
			}
		};

		/*blob configurations*/
		this.envConfig.blobStorage = {
			blobAccountName: process.env.BLOB_AC_NAME,
			blobAccountKey: process.env.BLOB_AC_KEY,
			blobSasUri: process.env.BLOB_SAS_URI,
			blobAccountConnectionString: process.env.BLOB_CONNECTION_STRING,
			blobLoggerContainer: process.env.BLOB_LOGGER_CONTAINER
		};

		/*logger*/
		this.envConfig.logger = {
			logLevel: process.env.LOG_LEVEL
		};

		/*Application secretes & token settings*/
		this.envConfig.tokenMetadata = {
			appAtSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
			appRtSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
			web: {
				at: {
					expiresIn: process.env.JWT_ACCESS_TOKEN_EXP_TIMEMIN_WEB
				},
				rt: {
					expiresIn: process.env.JWT_REFRESH_TOKEN_EXP_TIMEMIN_WEB,
					maxTtl: process.env.JWT_REFRESH_TOKEN_TTL_DAY_WEB
				}
			}
		};

		this.envConfig.azure = {
			azMgmt: {
				clientId: process.env.AAD_CLIENT_ID,
				clientSecret: process.env.AAD_CLIENT_SECRET,
				resource: process.env.AAD_SCOPE
			},
			resourceDetails: {
				tenantId: process.env.AZURE_TENENET_ID,
				subscriptionId: process.env.AZURE_SUBSCRIPTION_ID,
				resourcegroupId: process.env.AZURE_RESOURCE_GROUP,
				accountName: process.env.AZURE_VI_ACCOUNT,
				permissionType: process.env.AZURE_PERMISSION_TYPE,
				scope: process.env.AZUURE_SCOPE
			}
		};

		this.envConfig.emailTemp = {
			logo: process.env.EMAIL_LOGO
		};

		this.envConfig.oemDetails = {
			emailAddress: process.env.OEM_CONTACT_EMAIL_ADDRESS
		};
		this.envConfig.mailConfig = {
			mailScvProvider: process.env.MAIL_SERVICE_PROVIDER,
			transport: {
				host: process.env.MAIL_SVC_HOST,
				port: process.env.MAIL_SVC_PORT,
				auth: {
					user: process.env.MAIL_SVC_USERNAME,
					pass: process.env.MAIL_SVC_PASSWORD
				},
				tls: {
					rejectUnauthorized: false
				}
			},
			defaults: {
				from: {
					name: process.env.MAIL_SVC_FROM_NAME,
					address: process.env.MAIL_SVC_FROM
				}
			},
			azureCommSvc: {
				azureCommConnectionString: process.env.AZURE_COMM_CONNECTION_STRING,
				sender: process.env.AZURE_SENDER
			}
		};

		this.envConfig.managedApp = {
			appInfo: {
				publisherId: process.env.PUBLISHER_ID,
				offerId: process.env.OFFER_ID
			}
		};
	}

	get(key: string): any {
		return this.envConfig[key];
	}
}

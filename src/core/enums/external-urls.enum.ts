function urlFactory(url: ExternalUrls, urlParams?: string[]): string {
	let newURL: string = url as unknown as string;
	if (urlParams && urlParams.length > 0) {
		urlParams.forEach((val, key) => {
			newURL = newURL.split(`ARG${key}`).join(val?.toString());
		});
	}
	return newURL;
}

enum ExternalUrls {
	MS_OAUTH_TOKEN = 'https://login.microsoftonline.com/<TenantId>/oauth2/v2.0/token'
}

export { ExternalUrls, urlFactory };

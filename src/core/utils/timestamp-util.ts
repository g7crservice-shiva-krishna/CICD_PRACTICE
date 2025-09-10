/*Return current unix timestamp */
const unix_ts_now_notime = () => {
	return Math.floor(+new Date(new Date().toLocaleString('fr-CA', { dateStyle: 'short' })) / 1000);
};

const unix_ts_now = () => {
	return Math.floor(+new Date() / 1000);
};
const mongo_ts_opts = {
	toObject: { virtuals: true },
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at', currentTime: () => unix_ts_now() }
};
const unix_ts_end = () => {
	return new Date('9999-12-31').toISOString();
};

const convert_date_unix_ts = (date: Date) => {
	return Math.floor(+new Date(date) / 1000);
};
const convert_unix_ts_date = (timestamp: number): string => {
	const date = new Date(timestamp * 1000);
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
		timeZone: 'Asia/Kolkata'
	};
	const formattedDate = date.toLocaleString('en-US', options);
	return formattedDate;
};

const getCurrentTimestamp = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');

	return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

export { convert_date_unix_ts, unix_ts_end, unix_ts_now, unix_ts_now_notime, getCurrentTimestamp, convert_unix_ts_date, mongo_ts_opts };

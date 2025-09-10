const currentDate = () => {
	return <any>new Date().toISOString().slice(0, 19).replace('T', ' ');
};

const maxDate = () => {
	return <any>new Date('9999-12-31 00:00:00').toISOString().slice(0, 19).replace('T', ' ');
};

export { currentDate, maxDate };

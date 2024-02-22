export const calculateTime = (date) => {
	const restTime = new Date(date) - new Date();

	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	if (restTime < 0) {
		return {
			days: '00',
			hours: '00',
			minutes: '00',
			seconds: '00',
		};
	}

	const days = Math.floor(restTime / day);
	const hours = Math.floor((restTime % day) / hour);
	const minutes = Math.floor((restTime % hour) / minute);
	const seconds = Math.floor((restTime % minute) / second);

	return {
		days, hours, minutes, seconds,
	};
};

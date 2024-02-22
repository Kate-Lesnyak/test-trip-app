export const getDayWeek = (datetime) => {
	const date = new Date(datetime);
	const dayWeek = date.getDay();
	const dayWeekItems = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	return dayWeekItems[dayWeek];
}
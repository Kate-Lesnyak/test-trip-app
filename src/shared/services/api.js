import axios from "axios";

// const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
const API_KEY = '5EBVZ2C4UUVJXYXRL646W5MYX';

// async function getTrips(query) {
// 	const { data } = await axios.get(`${BASE_URL}/${query}?unitGroup=metric&key=${API_KEY}&contentType=json`);
// 	return data;
// }

// export { getTrips };

const tripInstance = axios.create({
	baseURL: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline"
})

export const getTrip1 = async (query) => {
	const { data } = await tripInstance.get(`/${query}?unitGroup=metric&key=${API_KEY}&contentType=json`);
	return data;
}

export const getTrip2 = async (query) => {
	const { data } = await tripInstance.get(`/${query}`, {
		params: {
			unitGroup: 'metric',
			key: API_KEY,
			contentType: 'json',
		}
	})
	return data;
}

export const getTrip = async (city, startDate, endDate) => {
	const { data } = await tripInstance.get(`/${city}/${startDate}/${endDate}`, {
		params: {
			unitGroup: 'metric',
			key: API_KEY,
			contentType: 'json',
		}
	})
	return data;
}


export const getTripToday = async (city) => {
	const { data } = await tripInstance.get(`/${city}/today`, {
		params: {
			unitGroup: 'metric',
			key: API_KEY,
			contentType: 'json',
		}
	})
	return data;
}


// API for getting forecast from - to for the city
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[city]/[date1]/[date2]?unitGroup=metric&include=days&key=YOUR_API_KEY&contentType=json

// API for getting today’s weather for the city
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[city]/today?unitGroup=metric&include=days&key=YOUR_API_KEY&contentType=json

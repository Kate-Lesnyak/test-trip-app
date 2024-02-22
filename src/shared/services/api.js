import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const tripInstance = axios.create({
	baseURL: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline"
})

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
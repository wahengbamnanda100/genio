// src/axiosInstance.ts
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		WATCH_WORD_KEY: "HNG37484=",
		Content: "application/json",
		SubscriptionID: "ConnectDB",
		"Content-Type": "application/json",
	},
});

// You can also set up interceptors here if needed
axiosInstance.interceptors.request.use(
	(config) => {
		// Do something before request is sent
		return config;
	},
	(error) => {
		// Do something with request error
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => {
		// Do something with response data
		return response;
	},
	(error) => {
		// Do something with response error
		return Promise.reject(error);
	}
);

export default axiosInstance;

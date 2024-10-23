import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL, // Default to environment variable
	headers: {
		WATCH_WORD_KEY: "HNG37484=",
		Content: "application/json",
		SubscriptionID: "ConnectDB",
		"Content-Type": "application/json",
	},
});

// Function to fetch config.json and update the baseURL
const fetchConfigAndUpdateInstance = async () => {
	try {
		const response = await fetch("/config.json");
		const config = await response.json();
		const apiUrl = config.API_URL || import.meta.env.VITE_API_URL;

		localStorage.setItem("domain", apiUrl);
		// Update the axiosInstance with the new baseURL
		axiosInstance.defaults.baseURL = apiUrl;
	} catch (error) {
		console.error("Error loading config, falling back to env variable", error);
		// If there's an error, the baseURL remains the environment variable
	}
};

// export const getDomainFromConfig = async () => {
// 	try {
// 		const response = await fetch("/config.json");
// 		const config = await response.json();
// 		const apiUrl = config.API_URL || import.meta.env.VITE_API_URL;
// 		return apiUrl;
// 	} catch {
// 		return import.meta.env.VITE_API_URL;
// 	}
// };

// Immediately call the fetchConfigAndUpdateInstance function to update the baseURL if necessary
fetchConfigAndUpdateInstance();

// Setup interceptors (optional)
axiosInstance.interceptors.request.use(
	(config) => {
		// Do something before request is sent
		return config;
	},
	(error) => {
		// Handle request error
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => {
		// Do something with response data
		return response;
	},
	(error) => {
		// Handle response error
		return Promise.reject(error);
	}
);

export default axiosInstance;

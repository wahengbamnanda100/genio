import { useEffect, useState } from "react";

const useConfig = () => {
	const [config, setConfig] = useState({
		API_URL: import.meta.env.VITE_API_URL,
	});

	useEffect(() => {
		// Fetch the config.json
		fetch("/config.json")
			.then((res) => res.json())
			.then((data) => {
				// If API_URL from config.json is empty, fallback to env variable
				const apiUrl = data.API_URL || import.meta.env.VITE_API_URL;
				setConfig({ ...data, API_URL: apiUrl });
			})
			.catch((err) => {
				console.error("Error loading config, using default env variables", err);
			});
	}, []);

	return config;
};

export default useConfig;

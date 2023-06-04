import {httpClient} from "@/Services/HttpClient.tsx";
import { useState } from "react";

export const useFetch = (url) => {
	// States to handle signup/login
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	
	// Login using google
	const handleGoogle = async (response) => {
		setLoading(true);
		
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify({credential: response.credential}),
		})
			.then((res) => {
				console.log("request", res);
				setLoading(false);

				return res.json();
			})
			.then((data) => {
				if (data?.token) {
					console.log(data.token);
					localStorage.setItem("user", JSON.stringify(data?.token));
					window.location.reload();
				}

				// throw new Error(data?.message || data);
			})
			.catch((error) => {
				setError(error?.message);
			});
		
		//
		// const login_result = await httpClient.post('/signup', JSON.stringify({credential: response.credential}));
		// const thetoken = login_result.data.token;
		// localStorage.setItem("user", JSON.stringify(thetoken));
		
	};
	
	
	
	// Return the results
	return {loading, error, handleGoogle};
};

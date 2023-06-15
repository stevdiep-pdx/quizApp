import { useState } from "react";
import {updateAxios} from "@/Services/Auth.tsx";

// https://www.sitepoint.com/google-auth-react-express/
// https://stackoverflow.com/questions/65234862/how-to-define-variable-google-when-using-google-one-tap-javascript-api
export const useFetch = (url) => {
	// States to handle signup/login
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	
	// Login using google
	const handleGoogle = async (response) => {
		setLoading(true);
		
		// Use a fetch request to login/make a new account
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			// Pass the credentials from google
			body: JSON.stringify({credential: response.credential}),
		})
			.then((res) => {
				setLoading(false);
				return res.json();
			})
			.then(async (data) => {
				// https://github.com/auth0/angular-jwt/issues/141
				// The the token exists, save it and update Axios
				if (data?.token) {
					localStorage.setItem("user", JSON.stringify(data?.token).slice(1, -1));
					await updateAxios(data?.token);
					window.location.reload();
				}

			})
			.catch((error) => {
				setError(error?.message);
			});
	};
	
	// Return the results
	return {loading, error, handleGoogle};
};

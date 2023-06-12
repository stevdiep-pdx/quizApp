import axios from "axios";

const serverIP = import.meta.env.API_HOST;
const serverPort = import.meta.env.PORT;

const serverUrl = `http://${serverIP}:${serverPort}`;

// This is why I use Axios over Fetch
export const httpClient = axios.create({
	baseURL: serverUrl,
	headers: {
		"Content-type": "application/json",
	},
});

// Allow the front-end to use the 'search' method to query the questions table
export const httpSearchQuestion = async (path: string, id: number) => {
	console.log("search");
	
	// Config to specify key and path
	const config = {
		method: 'search',
		url: serverUrl + path,
		data: {
			quiz_id: id
		},
	};
	
	// Send the request and return the data
	const res = await httpClient.request(config);
	return res.data;
};

// Allow the front-end to use the 'search' method to query the users table
export const httpSearchUser = async (path: string, id: number) => {
	console.log("search");
	
	// Config to specify key and path
	const config = {
		method: 'search',
		url: serverUrl + path,
		data: {
			id: id
		},
	};
	
	// Send the request and return the data
	const res = await httpClient.request(config);
	return res.data;
};

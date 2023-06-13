import { httpClient } from "@/Services/HttpClient.tsx";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext<AuthContextProps | null>(null);

export type AuthContextProps = {
	token: string | null;
	userId: number;
	handleLogout: () => void;
};

export const updateAxios = async (token: string) => {
	console.log("In update:", token);
	httpClient.interceptors.request.use(
		async (config) => {
			// @ts-ignore
			config.headers = {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			};
			console.log("Finished updating Axios");
			return config;
		},
		(error) => {
			console.error("REJECTED TOKEN PROMISE");
			Promise.reject(error);
		}
	);
};

const initialToken = getTokenFromStorage();
let initialUserId;

if (!(initialToken == null)) {
	console.log("Updating axios with token: ", initialToken);
	await updateAxios(initialToken);
	initialUserId = getUserIdFromToken(initialToken);
}

export const AuthProvider = ({ children }: any) => {
	const [token, setToken] = useState(initialToken);
	const [userId, setUserId] = useState(initialUserId);

	const handleLogout = () => {
		setToken(null);
		localStorage.removeItem("user");
	};

	return (
		<AuthContext.Provider
			value={{
				token,
				userId,
				handleLogout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};

function getTokenFromStorage() {
	const tokenString = localStorage.getItem("user");
	console.log(tokenString);
	if ( typeof tokenString === 'undefined' || tokenString === null) {
		console.log("No token found");
		return null;
	}
	console.log("Token found: ", tokenString);
	return tokenString;
}

export function getPayloadFromToken(token: string) {
	const base64Url = token.split(".")[1];
	if (base64Url == null) {
		console.log("Yikes your token has no payload, how did that happen?");
	}

	// Mostly ignore me, taken from JWT docs, this extracts the text payload from our token
	const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	const jsonPayload = decodeURIComponent(
		atob(base64)
			.split("")
			.map(function (c) {
				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join("")
	);

	const payload = JSON.parse(jsonPayload);
	console.log(payload);
	return payload;
}

function getUserIdFromToken(token: string) {
	const payload = getPayloadFromToken(token);
	return payload.userId;
}

// Signup.jsx
import {useFetch} from "@/Services/useFetch.tsx";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const reactId = import.meta.env.REACT_APP_GOOGLE_CLIENT_ID;

/** This is a component to signup
 *
 * @component
 */
export const SignUp = () => {
	// Get the function to handle google authentication and other variables
	const { handleGoogle, loading, error } = useFetch(
		"http://localhost:8080/signup"
	);
	
	// Get the client key and set up the window
	useEffect(() => {
		/* global google */
		if (window.google) {
			google.accounts.id.initialize({
				client_id: reactId,
				callback: handleGoogle,
			});
			
			// @ts-ignore
			// The below code generates errors incorrectly
			google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
				theme: "filled_black",
				text: "continue_with",
				shape: "pill",
			});
		}
	}, [handleGoogle]);
	
	return (
		<>
			<nav style={{ padding: "2rem" }}>
				<Link to="/">Go Back</Link>
			</nav>
			<header style={{ textAlign: "center" }}>
				<h1>Register to continue</h1>
			</header>
			<main
				style={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				{error && <p style={{ color: "red" }}>{error}</p>}
				{loading ? (
					<div>Loading....</div>
				) : (
					<div id="signUpDiv" data-text="signup_with"></div>
				)}
			</main>
			<footer></footer>
		</>
	);
};


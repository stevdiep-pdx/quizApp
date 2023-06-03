// import { useAuth } from "@/Services/Auth.tsx";
// import { useCallback, useState } from "react";
//
// export function Login() {
// 	const context = useAuth();
//
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [submitFailed, setSubmitFailed] = useState(false);
//
// 	const onSubmitLogin = useCallback(async () => {
// 		if (context) {
// 			const loginSuccess = await context.handleLogin(email, password);
// 			if (!loginSuccess) {
// 				setSubmitFailed(true);
// 			}
// 		} else {
// 			console.error("We have no auth context WARNING WARNING");
// 		}
// 	}, [email, password, context, setSubmitFailed]);
//
// 	return (
// 		<div>
// 			<div>Login</div>
// 			<div>
// 				{submitFailed ? <p>Your password or email was incorrect! Please try again.</p> : null}
// 			</div>
//
// 			<div>
// 				<label htmlFor={"email"}>Email Address:</label>
// 				<input
// 					type="text"
// 					id="email"
// 					required
// 					value={email}
// 					onChange={(e) => setEmail(e.target.value)}
// 					name={"email"}
// 				/>
// 			</div>
//
// 			<div>
// 				<label htmlFor={"password"}>Password:</label>
// 				<input
// 					type="text"
// 					id="password"
// 					required
// 					value={password}
// 					onChange={(e) => setPassword(e.target.value)}
// 					name={"password"}
// 				/>
// 			</div>
//
// 			<div>
// 				<button onClick={onSubmitLogin}>Submit</button>
// 			</div>
// 		</div>
// 	);
// }


import {useFetch} from "@/Services/useFetch.tsx";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const reactId = import.meta.env.REACT_APP_GOOGLE_CLIENT_ID;

// https://developers.google.com/identity/gsi/web/reference/js-reference

export const Login = () => {
	const { handleGoogle, loading, error } = useFetch(
		"http://localhost:8080/login"
	);
	
	useEffect(() => {
		/* global google */
		if (window.google) {
			google.accounts.id.initialize({
				client_id: reactId,
				callback: handleGoogle,
			});
			
			// @ts-ignore
			google.accounts.id.renderButton(document.getElementById("loginDiv"), {
				// type: "standard",
				theme: "filled_black",
				// size: "small",
				text: "signin_with",
				shape: "pill",
			});
			
			google.accounts.id.prompt();
		}
	}, [handleGoogle]);
	
	return (
		<>
			<nav style={{ padding: "2rem" }}>
				<Link to="/">Go Back</Link>
			</nav>
			<header style={{ textAlign: "center" }}>
				<h1>Login to continue</h1>
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
				{loading ? <div>Loading....</div> : <div id="loginDiv"></div>}
			</main>
			<footer></footer>
		</>
	);
};

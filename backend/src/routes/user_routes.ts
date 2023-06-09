import bcrypt from "bcrypt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { User } from "../db/entities/User.js";
import { ICreateUsersBody, IUpdateUsersBody } from "../types.js";
import { OAuth2Client } from "google-auth-library";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// Function to verify the token passed
const verifyGoogleToken = async (token) => {
	try {
		console.log("token:", token)
		
		const ticket = await client.verifyIdToken({
			idToken: token,
			// @ts-ignore
			requiredAudience: GOOGLE_CLIENT_ID,
		});
		console.log("passed verify");
		// @ts-ignore
		return { payload: ticket.getPayload() };
	} catch (error) {
		console.log("verify function messed up", error);
		return { error: "Invalid user detected. Please try again" };
	}
}

export function UserRoutesInit(app: FastifyInstance) {
	// TESTING ROUTES //
	// Route that returns all users
	app.get("/dbTest", async (request: FastifyRequest, _reply: FastifyReply) => {
		return request.em.find(User, {});
	});
	



	// CRUD ROUTES //
	// Create a user
	// app.post<{ Body: ICreateUsersBody }>("/users", async (req, reply) => {
	// 	// Get info from the body of the request
	// 	const { name, email, password } = req.body;
	//
	// 	try {
	// 		// Make a new user
	// 		const hashedPw = await bcrypt.hash(password, 10);
	// 		const newUser = await req.em.create(User, {
	// 			name,
	// 			email,
	// 			password: hashedPw
	// 		});
	//
	// 		// Persist changes
	// 		await req.em.flush();
	//
	// 		// Send a reply back
	// 		return reply.send(newUser);
	// 	} catch (err) {
	// 		// If there is an error, send an error code back
	// 		return reply.status(500).send({ message: err.message });
	// 	}
	// });

	// Read for a user
	app.search("/users", async (req, reply) => {
		// Get the id of the user we want from the body of the request
		const { id } = req.body;

		try {
			// Find the user
			const theUser = await req.em.findOneOrFail(User, id, {strict: true});

			// Send a reply back
			reply.send(theUser);
		} catch (err) {
			// If there is an error, send an error code back
			reply.status(500).send(err);
		}
	});

	// Update the name of a user
	app.put<{ Body: IUpdateUsersBody }>("/users", async (req, reply) => {
		// Get the new name and id of the user to change from the body of the request
		const { name, id } = req.body;

		// Find the user and update their name
		const userToChange = await req.em.findOneOrFail(User, id, {strict: true});
		userToChange.name = name;

		// Persist changes
		await req.em.flush();

		// Send a reply back
		reply.send(userToChange);
	});

	// Delete a user (only a user can delete their own account)
	app.delete<{ Body: { id: number } }>("/users", async (req, reply) => {
		const { id } = req.body;

		try {
			// Get the user
			const theUserToDelete = await req.em.findOneOrFail(User, id, {strict: true});

			// Delete the user and persist changes
			await req.em.remove(theUserToDelete).flush();

			// Send a reply back
			return reply.send(theUserToDelete);
		} catch (err) {
			// If there is an error, send an error code back
			return reply.status(500).send(err);
		}
	});
	
	
	
	// Login
	// app.post<{
	// 	Body: {
	// 		email: string,
	// 		password: string,
	// 	}
	// }>("/login", async (req, reply) => {
	// 	const { email, password } = req.body;
	//
	// 	try {
	// 		const theUser = await req.em.findOneOrFail(User, {email}, { strict: true });
	//
	// 		const hashCompare = await bcrypt.compare(password, theUser.password);
	// 		if (hashCompare) {
	// 			const userId = theUser.id;
	// 			const token = app.jwt.sign({ userId });
	//
	// 			reply.send({ token });
	// 		} else {
	// 			app.log.info(`Password validation failed -- ${password} vs ${theUser.password}`);
	// 			reply.status(401)
	// 				.send("Incorrect Password");
	// 		}
	// 	} catch (err) {
	// 		reply.status(500)
	// 			.send(err);
	// 	}
	// });
	
	// Google Auth Signup
	app.post<{
		Body: {
			credential: string
		}
	}>("/signup", async (req, reply) => {
		console.log("in sign up rroute", req.body.credential);
		try {
			// Verify the response
			const verificationResponse = await verifyGoogleToken(req.body.credential);
			
			// Send a message if it is bad
			if (verificationResponse.error) {
				return reply.status(400)
					.send(verificationResponse.error);
			}
			
			// Get the profile
			const profile = verificationResponse?.payload;
			
			// Make a new user
			const newUser = await req.em.create(User, {
				name: profile.given_name,
				email: profile.email,
			});
			
			// Persist changes
			await req.em.flush();
			
			// Get the user and send a token back with the id
			// Search for the user using the email from the profile
			const theUser = await req.em.findOneOrFail(User, {email: profile.email}, { strict: true });
			
			const userId = theUser.id;
			const token = app.jwt.sign({ userId });
			
			console.log("in signup");
			reply.status(201).send({token});
			
		} catch (err) {
			reply.status(500)
				.send(err);
		}
	});
	
	// Google Auth Login
	app.post<{
			Body: {
				credential
			}
	}>("/login", async (req, reply) => {
		
		try {
			// Verify the response
			const verificationResponse = await verifyGoogleToken(req.body.credential);
			
			// Send a message if it is bad
			if (verificationResponse.error) {
				return reply.status(400)
					.send(verificationResponse.error);
			}
			
			// Get the profile
			const profile = verificationResponse?.payload;
			
			// Search for the user using the email from the profile
			const theUser = await req.em.findOneOrFail(User, {email: profile.email}, { strict: true });
			
			const userId = theUser.id;
			const token = app.jwt.sign({ userId });
			
			console.log("in signin");
			reply.status(201).send({token});
		} catch (err) {
			reply.status(500)
				.send(err);
		}
	});
	
}

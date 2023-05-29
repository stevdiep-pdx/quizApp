import bcrypt from "bcrypt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { User } from "../db/entities/User.js";
import { ICreateUsersBody, IUpdateUsersBody } from "../types.js";

export function UserRoutesInit(app: FastifyInstance) {
	// TESTING ROUTES //
	// Route that returns all users
	app.get("/dbTest", async (request: FastifyRequest, _reply: FastifyReply) => {
		return request.em.find(User, {});
	});
	



	// CRUD ROUTES //
	// Create a user
	app.post<{ Body: ICreateUsersBody }>("/users", async (req, reply) => {
		// Get info from the body of the request
		const { name, email, password } = req.body;

		try {
			// Make a new user
			const hashedPw = await bcrypt.hash(password, 10);
			const newUser = await req.em.create(User, {
				name,
				email,
				password: hashedPw
			});

			// Persist changes
			await req.em.flush();

			// Send a reply back
			return reply.send(newUser);
		} catch (err) {
			// If there is an error, send an error code back
			return reply.status(500).send({ message: err.message });
		}
	});

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
	app.delete<{ Body: { id: number, password: string } }>("/users", async (req, reply) => {
		const { id, password } = req.body;

		try {
			// Get the user
			const theUserToDelete = await req.em.findOneOrFail(User, id, {strict: true});

			// Make sure that the password provided matches
			if (theUserToDelete.password !== password) {
				return reply.status(401).send();
			}

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
	app.post<{
		Body: {
			email: string,
			password: string,
		}
	}>("/login", async (req, reply) => {
		const { email, password } = req.body;
		
		try {
			const theUser = await req.em.findOneOrFail(User, {email}, { strict: true });
			
			const hashCompare = await bcrypt.compare(password, theUser.password);
			if (hashCompare) {
				const userId = theUser.id;
				const token = app.jwt.sign({ userId });
				
				reply.send({ token });
			} else {
				app.log.info(`Password validation failed -- ${password} vs ${theUser.password}`);
				reply.status(401)
					.send("Incorrect Password");
			}
		} catch (err) {
			reply.status(500)
				.send(err);
		}
	});
	
}

import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import { Quiz } from "../db/entities/Quiz.js";
import { User } from "../db/entities/User.js";

/** CRUD Routes for interacting with quizzes
 *
 * @param {FastifyInstance} app - The base Fastify listen server instance
 * @returns {Promise<void>} - Returns all of the initialized routes
 */
export function QuizRoutesInit(app: FastifyInstance) {
	// CRUD ROUTES //
	// Create a quiz
	app.post<{ Body: { id: number, quiz_name: string } }>("/quizzes", async (req, reply) => {
		const {id, quiz_name } = req.body;
		
		console.log("new quiz");
		try {
			// Find the creator of the quiz
			const creatorUser = await req.em.findOneOrFail(User, id, {strict: true});
			
			// Create the new message
			const newQuiz = await req.em.create(Quiz, {
				creator: creatorUser,
				name: quiz_name,
			});
			
			// Persist changes
			await req.em.flush();
			
			// Send a reply
			return reply.send(newQuiz);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});
	
	// Read all quizzes owned by a user
	app.search<{ Body: { id: number } }>("/quizzes", async (req, reply) => {
		const { id } = req.body;
		
		try {
			// Find the user and their quizzes
			const ownerEntity = await req.em.getReference(User, id);
			const quizzes = await req.em.find(Quiz, { creator: ownerEntity });
			
			// Send a reply back with all quizzes
			return reply.send(quizzes);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});
	
	// Update a quiz's name
	app.put<{ Body: { quiz_id: number; new_name: string } }>("/quizzes", async (req, reply) => {
		const { quiz_id, new_name } = req.body;
		
		try {
			// Find the quiz with the id and change its name
			const quiz = await req.em.findOneOrFail(Quiz, quiz_id, {strict: true});
			quiz.name = new_name;
			
			// Persist changes
			await req.em.persistAndFlush(quiz);
			
			// Send a reply
			return reply.send(quiz);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});
	
	// Delete a quiz
	app.delete<{ Body: { quiz_id: number } }>("/quizzes", async (req, reply) => {
		const { quiz_id } = req.body;
		
		try {
			// Get the quiz
			const quizToDelete = await req.em.findOneOrFail(Quiz, quiz_id, {strict: true});
			
			// Delete the quiz and persist
			await req.em.removeAndFlush(quizToDelete);
			
			// Send a response
			return reply.send(quizToDelete);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});
	
	// Get all quizzes
	app.get("/quizzes", async (request: FastifyRequest, _reply: FastifyReply) => {
		return request.em.find(Quiz, {});
	});
	
	// Get a random quiz
	app.get("/quizzes/random", async (req, reply) => {
		// Get the quiz repo and count all of the rows
		const quizRepo = req.em.getRepository(Quiz);
		const totalCount = await quizRepo.count();
		
		// https://futurestud.io/tutorials/get-number-of-seconds-since-epoch-in-javascript
		// Get the time
		const now = new Date();
		const hours = now.getTime();
		
		// Get the index based on the time
		const secondsSinceEpoch = Math.floor(hours / 1000);
		const hoursSinceEpoch = Math.floor(secondsSinceEpoch / 3600);
		
		console.log("hours since e ",hoursSinceEpoch);
		
		// Get the row
		const randomOffset = hoursSinceEpoch % totalCount;
		
		// Get the quiz in that row and return it
		// https://mikro-orm.io/docs/3.6/entity-manager
		const randomQuiz = await req.em.find(Quiz, {}, {limit: 1, offset: randomOffset});
		reply.send(randomQuiz[0]);
	});
}

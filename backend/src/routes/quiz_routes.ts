import { FastifyInstance } from "fastify";
import { Quiz } from "../db/entities/Quiz.js";
import { User } from "../db/entities/User.js";

export function QuizRoutesInit(app: FastifyInstance) {
	// CRUD ROUTES //
	// Create a quiz
	app.post<{ Body: { id: number, quiz_name: string } }>("/quizzes", async (req, reply) => {
		const {id, quiz_name } = req.body;
		
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
	app.delete<{ Body: { my_id: number, quiz_id: number; password: string } }>("/quizzes", async (req, reply) => {
		const { my_id, quiz_id, password } = req.body;
		
		try {
			// Get the user
			const me = await req.em.findOneOrFail(User, my_id, {strict: true});
			
			// Make sure that the password provided matches
			if (me.password !== password) {
				return reply.status(401).send();
			}
			
			// Get the quiz
			const quizToDelete = await req.em.findOneOrFail(Quiz, quiz_id, {strict: true});
			
			// Delete the quiz and persist
			await req.em.removeAndFlush(quizToDelete);
			
			// Send a response
			return reply.send();
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});
}


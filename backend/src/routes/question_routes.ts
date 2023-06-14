import { FastifyInstance } from "fastify";
import {Question} from "../db/entities/Question.js";
import { Quiz } from "../db/entities/Quiz.js";
import {ICreateQuestion, IUpdateQuestion} from "../types.js";

/** CRUD Routes for interacting with questions
 *
 * @param {FastifyInstance} app - The base Fastify listen server instance
 * @returns {Promise<void>} - Returns all of the initialized routes
 */
export function QuestionRoutesInit(app: FastifyInstance) {
	// CRUD ROUTES //
	// Create a question
	app.post<{ Body: ICreateQuestion }>("/questions", async (req, reply) => {
		const {quiz_id, question, answer, option2, option3, option4} = req.body;
		
		try {
			// Find parent quiz
			const quiz = await req.em.findOneOrFail(Quiz, quiz_id, {strict: true});
			
			// Create the new question
			const newQuestion = await req.em.create(Question, {
				quiz,
				question,
				answer,
				option2,
				option3,
				option4
			});
			
			// Persist changes
			await req.em.flush();
			
			// Send a reply
			return reply.send(newQuestion);
		} catch (err) {
			return reply.status(500).send({message: err.message});
		}
	});
	
	// Read all questions for a particular quiz
	app.search<{ Body: { quiz_id: number } }>("/questions", async (req, reply) => {
		const {quiz_id} = req.body;
		
		console.log("searching questions for quiz ", quiz_id);
		try {
			// Find the quiz and their questions
			const quizEntity = await req.em.getReference(Quiz, quiz_id);
			const questions = await req.em.find(Question, {quiz: quizEntity});
			
			// Send a reply back with all quizzes
			return reply.send(questions);
		} catch (err) {
			return reply.status(500).send({message: err.message});
		}
	});
	
	// Change a question and its answers
	app.put<{ Body: IUpdateQuestion }>("/questions", async (req, reply) => {
		const {question_id, question, answer, option2, option3, option4} = req.body;
		
		try {
			// Find the question
			const questionToChange = await req.em.findOneOrFail(Question, question_id, {strict: true});
			
			// Change the members of the question
			questionToChange.question = question;
			questionToChange.answer = answer;
			questionToChange.option2 = option2;
			questionToChange.option3 = option3;
			questionToChange.option4 = option4;
			
			
			// Persist changes
			await req.em.flush();
			
			// Send a reply
			return reply.send(questionToChange);
		} catch (err) {
			return reply.status(500).send({message: err.message});
		}
	});
	
	// Delete a question
	app.delete<{ Body: { question_id: number } }>("/questions", async (req, reply) => {
		const {question_id} = req.body;
		
		try {
			// Get the question
			const questionToDelete = await req.em.findOneOrFail(Question, question_id, {strict: true});
			
			// Delete the question and persist
			await req.em.removeAndFlush(questionToDelete);
			
			// Send a response
			return reply.send(questionToDelete);
		} catch (err) {
			return reply.status(500).send({message: err.message});
		}
	});
}


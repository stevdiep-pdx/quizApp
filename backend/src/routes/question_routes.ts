import { FastifyInstance } from "fastify";
import {Question} from "../db/entities/Question.js";
import { Quiz } from "../db/entities/Quiz.js";
import { User } from "../db/entities/User.js";
import {ICreateQuestion, IUpdateQuestion} from "../types.js";

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
		
		try {
			// Find the quiz and their questions
			const quiz = await req.em.getReference(Quiz, quiz_id);
			const questions = await req.em.find(Question, quiz);
			
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
	app.delete<{ Body: { my_id: number, question_id: number; password: string } }>("/questions", async (req, reply) => {
		const {my_id, question_id, password} = req.body;
		
		try {
			// Get the user
			const me = await req.em.findOneOrFail(User, my_id, {strict: true});
			
			// Make sure that the password provided matches
			if (me.password !== password) {
				return reply.status(401).send();
			}
			
			// Get the question
			const questionToDelete = await req.em.findOneOrFail(Question, question_id, {strict: true});
			
			// Delete the question and persist
			await req.em.removeAndFlush(questionToDelete);
			
			// Send a response
			return reply.send();
		} catch (err) {
			return reply.status(500).send({message: err.message});
		}
	});
}


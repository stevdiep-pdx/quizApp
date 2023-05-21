import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from '@mikro-orm/seeder';
import {Question} from "../entities/Question.js";

export class QuestionSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {
		// https://mikro-orm.io/docs/seeding#shared-context
		
		context.question1 = em.create(Question, {
			quiz: context.quiz1,
			question: "What is the correct answer?",
			answer: "This one",
			option2: "Not this one",
			option3: "Wrong answer",
			option4: "Absolutely not this one"
		});
		context.question2 = em.create(Question, {
			quiz: context.quiz1,
			question: "What is a dog?",
			answer: "A mammal",
			option2: "A fish",
			option3: "A reptile",
			option4: "A plant"
		});
		context.question3 = em.create(Question, {
			quiz: context.quiz3,
			question: "Who was the first president",
			answer: "George Washington",
			option2: "Obama",
			option3: "Bush",
			option4: "JFK"
		});
		context.question4 = em.create(Question, {
			quiz: context.quiz6,
			question: "1 + 1",
			answer: "2",
			option2: "3",
			option3: "4",
			option4: "5"
		});
		context.question5 = em.create(Question, {
			quiz: context.quiz6,
			question: "1 + 10",
			answer: "11",
			option2: "3",
			option3: "4",
			option4: "5"
		});
		context.question6 = em.create(Question, {
			quiz: context.quiz4,
			question: "Which of these states is on the west coast?",
			answer: "California",
			option2: "Florida",
			option3: "New York",
			option4: "Utah"
		});
	}
}

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
		context.question7 = em.create(Question, {
			quiz: context.quiz1,
			question: "What color is an orange?",
			answer: "Orange",
			option2: "Purple",
			option3: "Brown",
			option4: "Green"
		});
		context.question8 = em.create(Question, {
			quiz: context.quiz1,
			question: "Which of the following is an animal?",
			answer: "A dog",
			option2: "A table",
			option3: "A book",
			option4: "None of the above"
		});
		context.question9 = em.create(Question, {
			quiz: context.quiz1,
			question: "How many wheels does a unicycle have?",
			answer: "1",
			option2: "23",
			option3: "98",
			option4: "13423"
		});
		context.question10 = em.create(Question, {
			quiz: context.quiz3,
			question: "Which of the following is a US president?",
			answer: "Benjamin Franklin",
			option2: "My history teacher",
			option3: "Batman",
			option4: "None of the above"
		});
		context.question11 = em.create(Question, {
			quiz: context.quiz3,
			question: "Who was the president during the Civil War?",
			answer: "Abraham Lincoln",
			option2: "George Washington",
			option3: "George Bush",
			option4: "JFK"
		});
		context.question12 = em.create(Question, {
			quiz: context.quiz4,
			question: "Which of the following is a US state?",
			answer: "Oregon",
			option2: "UK",
			option3: "Canada",
			option4: "China"
		});
		context.question13 = em.create(Question, {
			quiz: context.quiz4,
			question: "Which state is New York City in?",
			answer: "New York",
			option2: "Florida",
			option3: "Texas",
			option4: "Utah"
		});
		context.question14 = em.create(Question, {
			quiz: context.quiz5,
			question: "Which state is New York City in?",
			answer: "New York",
			option2: "Florida",
			option3: "Texas",
			option4: "Utah"
		});
		context.question15 = em.create(Question, {
			quiz: context.quiz7,
			question: "Which of the following is a programming language?",
			answer: "Typescript",
			option2: "Postgres",
			option3: "Docker",
			option4: "Firefox"
		});
		context.question16 = em.create(Question, {
			quiz: context.quiz7,
			question: "Which of the following is a front-end framework?",
			answer: "React",
			option2: "SQL",
			option3: "IntelliJ",
			option4: "Fedora"
		});
		context.question17 = em.create(Question, {
			quiz: context.quiz7,
			question: "What language can you build microservices with?",
			answer: "Rust",
			option2: "Spanish",
			option3: "Git",
			option4: "None of the above"
		});
	}
}

import { Entity, Property, ManyToOne, Cascade } from "@mikro-orm/core";
import type { Ref, Rel } from "@mikro-orm/core";
import { QuizBaseEntity } from "./QuizBaseEntity.js";
import { Quiz } from "./Quiz.js";

@Entity()
export class Question extends QuizBaseEntity {
	// The quiz that this question belongs too
	@ManyToOne()
	quiz!: Ref<Quiz>;
	
	// The quiz name
	@Property()
	question!: string;
	
	// 'answer' contains the true answer to the question, the others are possibilities
	@Property()
	answer!: string;
	
	@Property()
	option2!: string;
	
	@Property()
	option3!: string;
	
	@Property()
	option4!: string;
}

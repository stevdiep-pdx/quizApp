import { Entity, Property, ManyToOne } from "@mikro-orm/core";
import type { Ref } from "@mikro-orm/core";
import { QuizBaseEntity } from "./QuizBaseEntity.js";
import { Quiz } from "./Quiz.js";

/** Class to manage questions */
@Entity()
export class Question extends QuizBaseEntity {
	/** Quiz that the question belongs to */
	@ManyToOne({onUpdateIntegrity: 'set null', onDelete: 'cascade'})
	quiz!: Ref<Quiz>;
	
	/** Questions */
	@Property()
	question!: string;
	
	/** The correct option */
	@Property()
	answer!: string;
	
	/** An option */
	@Property()
	option2!: string;
	
	/** An option */
	@Property()
	option3!: string;
	
	/** An option */
	@Property()
	option4!: string;
}

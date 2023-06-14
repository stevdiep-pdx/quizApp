import {Entity, Property, ManyToOne, OneToMany, Cascade, Collection} from "@mikro-orm/core";
import type { Ref } from "@mikro-orm/core";
import {Question} from "./Question.js";
import { QuizBaseEntity } from "./QuizBaseEntity.js";
import { User } from "./User.js";

/** Class to manage quizzes */
@Entity()
export class Quiz extends QuizBaseEntity {
	/** Creator of the quiz */
	@ManyToOne({onUpdateIntegrity: 'set null', onDelete: 'cascade'})
	creator!: Ref<User>;
	
	/** Quiz name */
	@Property()
	name!: string;
	
	/** Questions in the quiz (used to cascade) */
	@OneToMany(
		() => Question,
		question => question.quiz,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE], orphanRemoval: true}
	)
	questions!: Collection<Question>;
}

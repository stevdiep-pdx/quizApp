import {Entity, Property, ManyToOne, OneToMany, Cascade, Collection} from "@mikro-orm/core";
import type { Ref } from "@mikro-orm/core";
import {Question} from "./Question.js";
import { QuizBaseEntity } from "./QuizBaseEntity.js";
import { User } from "./User.js";

@Entity()
export class Quiz extends QuizBaseEntity {
	// The quiz creator
	@ManyToOne({onUpdateIntegrity: 'set null', onDelete: 'cascade'})
	creator!: Ref<User>;
	
	// The quiz name
	@Property()
	name!: string;
	
	// Note that these DO NOT EXIST in the database itself!
	@OneToMany(
		() => Question,
		question => question.quiz,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE], orphanRemoval: true}
	)
	questions!: Collection<Question>;
}

import { Entity, Property, ManyToOne, Cascade } from "@mikro-orm/core";
import type { Ref, Rel } from "@mikro-orm/core";
import { QuizBaseEntity } from "./QuizBaseEntity.js";
import { User } from "./User.js";

@Entity()
export class Quiz extends QuizBaseEntity {
	// The quiz creator
	@ManyToOne()
	creator!: Ref<User>;
	
	// The quiz name
	@Property()
	name!: string;
}

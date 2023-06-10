import { Entity, Property, Unique, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import {Leaderboard} from "./Leaderboard.js";
import { QuizBaseEntity } from "./QuizBaseEntity.js";

import { Quiz } from "./Quiz.js";

@Entity({ tableName: "users"})
export class User extends QuizBaseEntity {
	@Property()
	@Unique()
	email!: string;
	
	@Property()
	name!: string
	
	// Note that these DO NOT EXIST in the database itself!
	@OneToMany(
		() => Quiz,
		quiz => quiz.creator,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE], orphanRemoval: true}
	)
	quizzes!: Collection<Quiz>;
	
	@OneToMany(
		() => Leaderboard,
		leaderboard => leaderboard.player,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE], orphanRemoval: true}
	)
	leaderboardEntries!: Collection<Leaderboard>;
}

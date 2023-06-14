import { Entity, Property, Unique, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import {Leaderboard} from "./Leaderboard.js";
import { QuizBaseEntity } from "./QuizBaseEntity.js";

import { Quiz } from "./Quiz.js";

/** Class to manage users */
@Entity({ tableName: "users"})
export class User extends QuizBaseEntity {
	/** User's email, must be unique */
	@Property()
	@Unique()
	email!: string;
	
	/** Username */
	@Property()
	name!: string
	
	/** List of quizzes (used to cascade) */
	@OneToMany(
		() => Quiz,
		quiz => quiz.creator,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE], orphanRemoval: true}
	)
	quizzes!: Collection<Quiz>;
	
	/** List of leaderboard entries (used to cascade) */
	@OneToMany(
		() => Leaderboard,
		leaderboard => leaderboard.player,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE], orphanRemoval: true}
	)
	leaderboardEntries!: Collection<Leaderboard>;
}

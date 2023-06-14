import {Entity, ManyToOne, Property} from "@mikro-orm/core";
import type {Ref} from "@mikro-orm/core";
import {QuizCompositeEntity} from "./QuizBaseEntity.js";
import {User} from "./User.js";

/** Class to manage the leaderboard */
@Entity()
export class Leaderboard extends QuizCompositeEntity {
	/** The player */
	@ManyToOne({primary: true})
	player!: Ref<User>;
	
	/** The entry time, used with the player to search for entries */
	@Property({primary: true})
	time!: number;
	
	/** The player's scores */
	@Property()
	score!: number;
}

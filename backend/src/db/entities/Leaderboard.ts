import {Entity, ManyToOne, Property} from "@mikro-orm/core";
import type {Ref} from "@mikro-orm/core";
import {QuizCompositeEntity} from "./QuizBaseEntity.js";
import {User} from "./User.js";

@Entity()
export class Leaderboard extends QuizCompositeEntity {
	// The player
	@ManyToOne({primary: true})
	player!: Ref<User>;
	
	// The hour that the score was logged
	// Primary because only one score can be logged for a player per rotation
	@Property({primary: true})
	time!: number;
	
	// The score
	@Property()
	score!: number;
}

import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from '@mikro-orm/seeder';
import { Quiz } from "../entities/Quiz.js";
import {User} from "../entities/User.js";

export class QuizSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {

		const quizRepo = em.getRepository(Quiz);

		// https://mikro-orm.io/docs/seeding#shared-context

		quizRepo.create({
			creator: context.user1,
			name: "Steven Quiz 1",
		});
		quizRepo.create({
			creator: context.user1,
			name: "Steven Quiz 2",
		});
		quizRepo.create({
			creator: context.user2,
			name: "Presidents",
		});
		quizRepo.create({
			creator: context.user2,
			name: "US States",
		});
		quizRepo.create({
			creator: context.user2,
			name: "Cities",
		});
		quizRepo.create({
			creator: context.user3,
			name: "Adding",
		});
		

	}
}

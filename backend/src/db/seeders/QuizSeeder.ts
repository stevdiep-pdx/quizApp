import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from '@mikro-orm/seeder';
import { Quiz } from "../entities/Quiz.js";

export class QuizSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {
		// https://mikro-orm.io/docs/seeding#shared-context
		
		context.quiz1 = em.create(Quiz, {
			creator: context.user1,
			name: "Super Easy Quiz",
		});
		context.quiz2 = em.create(Quiz, {
			creator: context.user1,
			name: "Quiz with No Questions",
		});
		context.quiz3 = em.create(Quiz, {
			creator: context.user2,
			name: "Presidents",
		});
		context.quiz4 = em.create(Quiz, {
			creator: context.user2,
			name: "US States",
		});
		context.quiz5 = em.create(Quiz, {
			creator: context.user2,
			name: "Cities",
		});
		context.quiz6 = em.create(Quiz, {
			creator: context.user3,
			name: "Adding",
		});
		context.quiz7 = em.create(Quiz, {
			creator: context.user5,
			name: "Full-Stack Web Development",
		});
	}
}

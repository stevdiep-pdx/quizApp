import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { User } from "../entities/User.js";

export class UserSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {
		// https://mikro-orm.io/docs/seeding#shared-context
		context.user1 = em.create(User, {
			name: "Steven",
			email: "email@email.com",
		});
		context.user2 = em.create(User, {
			name: "HistoryBuff",
			email: "email2@email.com",
		});
		context.user3 = em.create(User, {
			name: "MathGuy",
			email: "email3@email.com",
		});
		context.user4 = em.create(User, {
			name: "NotaDog",
			email: "email4@email.com",
		});
		context.user5 = em.create(User, {
			name: "Steven Diep",
			email: "stevdiep@pdx.edu",
		});
	}
}

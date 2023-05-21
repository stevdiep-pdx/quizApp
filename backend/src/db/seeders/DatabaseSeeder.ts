import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {QuestionSeeder} from "./QuestionSeeder.js";
import { QuizSeeder } from "./QuizSeeder.js";
import {UserSeeder} from "./UserSeeder.js";

export class DatabaseSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		return this.call(em, [
			UserSeeder,
			QuizSeeder,
			QuestionSeeder
		]);
	}
}

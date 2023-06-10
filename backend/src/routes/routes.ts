import dotenv from "dotenv";
dotenv.config();

import { FastifyInstance } from "fastify";
import {LeaderboardRoutesInit} from "./leaderboard_routes.js";
import {QuestionRoutesInit} from "./question_routes.js";
import { QuizRoutesInit } from "./quiz_routes.js";
import { UserRoutesInit } from "./user_routes.js";

/** This function creates all backend routes for the site
 *
 * @param {FastifyInstance} app - The base Fastify listen server instance
 * @param {{}} _options - Fastify instance options (Optional)
 * @returns {Promise<void>} - Returns all of the initialized routes
 */
async function QuizRoutes(app: FastifyInstance, _options = {}) {
	if (!app) {
		throw new Error("Fastify instance has no value during routes construction");
	}

	UserRoutesInit(app);
	QuizRoutesInit(app);
	QuestionRoutesInit(app);
	LeaderboardRoutesInit(app);
}

export default QuizRoutes;

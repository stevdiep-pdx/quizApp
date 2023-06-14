import {FastifyInstance} from "fastify";
import {Leaderboard} from "../db/entities/Leaderboard.js";
import { User } from "../db/entities/User.js";

/** Routes for updating and getting the leaderboard
 *
 * @param {FastifyInstance} app - The base Fastify listen server instance
 * @returns {Promise<void>} - Returns all of the initialized routes
 */
export function LeaderboardRoutesInit(app: FastifyInstance) {
	// The leaderboard does not need a set of CRUD routes, it only needs a route to update the leaderboard and get it
	
	// Update the leaderboard
	app.put<{ Body: { id: number; score: number } }>("/leaderboard", async (req, reply) => {
		const { id, score } = req.body;
		
		try {
			// Generate the time
			const now = new Date();
			const hours = now.getTime();
			const secondsSinceEpoch = Math.floor(hours / 1000);
			const hoursSinceEpoch = Math.floor(secondsSinceEpoch / 3600);
			
			// Find the player
			const player = await req.em.getReference(User, id);
			
			
			// Find an entry in the leaderboard by the player and the time
			let leaderboardEntry = await req.em.findOne(Leaderboard, {player: player, time: hoursSinceEpoch});
			
			console.log("time ", hoursSinceEpoch);
			// If the entry does not exist, make one
			if(!leaderboardEntry) {
				console.log("nothing found");
				leaderboardEntry = await req.em.create(Leaderboard, {
					player: player,
					time: hoursSinceEpoch,
					score: score,
				});
			}
			
			// Update their score if it is greater
			if(leaderboardEntry.score < score)
				leaderboardEntry.score = score;
			
			// Persist changes
			await req.em.persistAndFlush(leaderboardEntry);
			
			// Send a reply
			return reply.send(leaderboardEntry);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});
	
	// Get the leaderboard for the prior quiz
	app.get("/leaderboard", async (req, reply) => {
		// Get the time
		const now = new Date();
		const hours = now.getTime();
		const secondsSinceEpoch = Math.floor(hours / 1000);
		const hoursSinceEpoch = Math.floor(secondsSinceEpoch / 3600);

		console.log("hours since e ",hoursSinceEpoch);

		// Get all entries from the hour prior
		const leaderboardEntries = await req.em.find(Leaderboard, {time: hoursSinceEpoch -1 });

		// Get the quiz in that row and return it
		reply.send(leaderboardEntries);
	});
}

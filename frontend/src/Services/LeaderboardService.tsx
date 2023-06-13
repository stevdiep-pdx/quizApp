import {httpClient} from "@/Services/HttpClient.tsx";

// Service to access the quizzes routes from the back-end
export const LeaderboardService = {
	
	// Get the leaderboard
	async get() {
		return httpClient.get("/leaderboard");
	},
	
	// Update the leaderboard
	async put(id: number, score: number) {
		return httpClient.put("/leaderboard", {id, score});
	},
};

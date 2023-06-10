import {httpClient} from "@/Services/HttpClient.tsx";

// Service to access the quizzes routes from the back-end
export const LeaderboardService = {
	
	// Get the leaderboard
	async get() {
		return httpClient.get("/leaderboard");
	},
	
	// Update the leaderboard
	async put(id: number, new_name: string) {
		return httpClient.put("/quizzes", {quiz_id: id, new_name});
	},
};

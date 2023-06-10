import {httpClient, httpSearchUser} from "@/Services/HttpClient.tsx";

// Service to access the quizzes routes from the back-end
export const UserService = {
	
	// Get the user
	async search(id: number) {
		return httpSearchUser("/users", id);
	},
	
	// Update the leaderboard
	async put(id: number, new_name: string) {
		return httpClient.put("/quizzes", {quiz_id: id, new_name});
	},
};

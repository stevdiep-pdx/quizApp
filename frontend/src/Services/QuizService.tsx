import {httpClient, httpSearchUser} from "@/Services/HttpClient.tsx";

// Service to access the quizzes routes from the back-end
export const QuizService = {
	
	// Get all quizzes
	async send() {
		return httpClient.get("/quizzes");
	},
	
	// Get all quizzes owned by a particular user
	async search(id: number) {
		return httpSearchUser("/quizzes", id);
	},
	
	// Make a new quiz
	async post(id: number, name: string) {
		return httpClient.post("/quizzes", {id: id, quiz_name: name});
	}
};

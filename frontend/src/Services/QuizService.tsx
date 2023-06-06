import { httpClient } from "@/Services/HttpClient.tsx";

// Service to access the quizzes routes from the back-end
export const QuizService = {
	
	// Get all quizzes
	async send() {
		return httpClient.get("/quizzes");
	}
	
	// Get all quizzes owned by a particular user
};

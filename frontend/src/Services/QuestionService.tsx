import { httpClient } from "@/Services/HttpClient.tsx";

// Service to access the question routes from the back-end
export const QuestionService = {
	
	// Get all questions for a particular quiz and send them back to the front-end
	async send(quiz_id: number) {
		return httpClient.search("/questions", {quiz_id});
	}
};

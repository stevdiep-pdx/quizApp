import {httpClient, httpSearchQuestion} from "@/Services/HttpClient.tsx";

// Service to access the question routes from the back-end
export const QuestionService = {
	
	// Get all questions for a particular quiz and send them back to the front-end
	async search(quiz_id: number) {
		return httpSearchQuestion("/questions", quiz_id);
	}
	
	// Delete a question
	
	// Update a question
	
	// Create a question
};

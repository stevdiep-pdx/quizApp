import {httpClient, httpSearchQuestion} from "@/Services/HttpClient.tsx";

// Service to access the question routes from the back-end
export const QuestionService = {
	
	// Get all questions for a particular quiz and send them back to the front-end
	async search(quiz_id: number) {
		return httpSearchQuestion("/questions", quiz_id);
	},
	
	// Delete a question
	async delete(question_id: number) {
		return httpClient.delete("/questions", {data: {question_id}});
	},
	
	// Update a question
	async put(question_id: number, question: string, answer: string, option2: string, option3: string, option4: string) {
		return httpClient.put("/questions", {question_id, question, answer, option2, option3, option4,});
	},
	
	// Create a question
	async post(quiz_id: number, question: string, answer: string, option2: string, option3: string, option4: string) {
		return httpClient.post("/questions", {quiz_id, question, answer, option2, option3, option4});
	}
};

import {httpClient, httpSearchUser} from "@/Services/HttpClient.tsx";

// Service to access the quizzes routes from the back-end
export const UserService = {
	
	// Get the user
	async search(id: number) {
		return httpSearchUser("/users", id);
	},
	
	// Update the username
	async put(id: number, name: string) {
		return httpClient.put("/users", {name, id});
	},
	
	// Delete the user
	async delete(id: number) {
		return httpClient.delete("/users", {data: {id}});
	}
};

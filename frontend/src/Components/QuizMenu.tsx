import "@css/QuizStyles.css";
import {QuizToEdit} from "@/Components/QuizToEdit.tsx";
import { useAuth } from "@/Services/Auth.tsx";
import {QuizService} from "@/Services/QuizService.tsx";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

/** This is a component to display all quizzes owned by a user and let them edit one
 *
 * @component
 */
export const QuizMenu = () => {
	// Initial list of quizzes
	const [quizzes, setQuizzes] = useState([]);
	const [newName, setNewName] = useState("");
	
	const auth = useAuth();					// Used to get user id
	const navigate = useNavigate();		// Used to navigate pages
	
	// Call the service to get the quizzes owned by the user
	const getQuizzes = async () => {
		const quizzesRes = await QuizService.search(auth.userId);
		console.log(quizzesRes);
		return quizzesRes;
	};
	
	// Get all quizzes owned by the user
	useEffect(() => {
		getQuizzes().then(setQuizzes);
	}, []);
	
	// When the delete button is clicked, delete the quiz
	const onDeleteButtonClick = (id: number) => {
		console.log(`delete ${id}`);
		
		// Delete the quiz
		QuizService.delete(id)
			.then(() => {
				console.log("deleted");
				
				// Update the state by getting the new list
				getQuizzes().then(setQuizzes);
			})
			.catch(err => console.log(err));
	};
	
	// When the edit button is clicked, go to the page to edit the quiz and pass the quiz id
	const onEditButtonClick = (name: string, quiz_id: number) => {
		console.log(`edit ${quiz_id}`);
		
		// Navigate to the questions page
		navigate("/profile/questions", { state: {name, quiz_id} });
	};
	
	// When the create button is clicked, make a request and go to the page to edit the quiz and pass the quiz id
	const onCreateButtonClick = (name: string, id: number) => {
		console.log(`create ${name} by user ${id}`);
		
		// Variable to hold quiz id, will later be passed
		let quiz_id = 0;
		
		// Make a new quiz
		QuizService.post(id, name)
			.then((response) => {
				console.log("nav next", response.data.id);
				
				// Save the quiz id
				quiz_id = response.data.id;
				
				// Update the state by getting the new list and clearing the input
				setNewName("");
				getQuizzes().then(setQuizzes);
				
				// Navigate to the questions page
				navigate("/profile/questions", { state: {name, quiz_id} });
			})
			.catch(err => console.log(err));
	};
	
	// Build a list of quizzes using map()
	return (
		<div>
			<h2 className="text-center text-2xl mt-4">Edit a Quiz</h2>
			<div className="text-center mt-4">
				<label htmlFor="newQuiz">Create a Quiz: </label>
				<input
					placeholder="Name..."
					type="text"
					id="newQuiz"
					required
					value={newName}
					onChange={e => setNewName(e.target.value)}
					name="newQuiz"
					className="input input-bordered"
				/>
				{
					newName != "" &&
					<button className="btn btn-primary" onClick={() => onCreateButtonClick(newName, auth.userId)}>Create</button>
				}
			</div>
			{quizzes ? (
				<ul className="list-none">
					{quizzes.map((quiz: { name: string, id: number }) => (
						// Everything list items should contain the name and id
						<li key={quiz.name}>
							<QuizToEdit
								name={quiz.name}
								id={quiz.id}
								onEditButtonClick={(name, id) => onEditButtonClick(name, id)}
								onDeleteButtonClick={(id: number) => onDeleteButtonClick(id)}
							/>
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
};

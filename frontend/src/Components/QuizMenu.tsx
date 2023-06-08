import {QuizToEdit} from "@/Components/QuizToEdit.tsx";
import { useAuth } from "@/Services/Auth.tsx";
import {QuizService} from "@/Services/QuizService.tsx";
import { useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

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
	const onEditButtonClick = (name: string, id: number) => {
		console.log(`edit ${id}`);
		
		
		
		// Navigate to the questions page
		//navigate("/questions", { state: {name, id} });
	};
	
	// When the create button is clicked, make a request and go to the page to edit the quiz and pass the quiz id
	const onCreateButtonClick = (name: string, id: number) => {
		console.log(`create ${name} by user ${id}`);
		
		// Make a new quiz
		QuizService.post(id, name)
			.then(() => {
				console.log("nav next");
				
				// Update the state by getting the new list and clearing the input
				setNewName("");
				getQuizzes().then(setQuizzes);
			})
			.catch(err => console.log(err));
		
		// Navigate to the questions page
		//navigate("/questions", { state: {name, id} });
	};
	
	// Build a list of quizzes using map()
	return (
		<div>
			<h1>Your Quizzes</h1>
			<h2>Select a Quiz:</h2>
			<div>
				<label htmlFor="newQuiz">New Quiz: </label>
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
				<ul>
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

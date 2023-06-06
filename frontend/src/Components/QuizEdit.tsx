import {Quiz} from "@/Components/Quiz.tsx";
import { useAuth } from "@/Services/Auth.tsx";
import {QuizService} from "@/Services/QuizService.tsx";
import { useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

export const QuizEdit = () => {
	// Initial list of quizzes
	const [quizzes, setQuizzes] = useState([]);
	const [newName, setNewName] = useState("");
	
	const auth = useAuth();					// Used to get user id
	const navigate = useNavigate();		// Used to navigate pages
	
	// Get all quizzes owned by the user
	useEffect(() => {
		const getQuizzes = async () => {
			const quizzesRes = await QuizService.search(auth.userId);
			return quizzesRes.data;
		};
		
		getQuizzes().then(setQuizzes);
	}, [auth.userId]);
	
	// When the play button is clicked, go to the page to play the quiz and pass the quiz id
	const onPlayButtonClick = (name: string, id: number) => {
		console.log(`edit ${name} ${id}`);
		
		// Navigate to the questions page
		//navigate("/questions", { state: {name, id} });
	};
	
	// When the play button is clicked, go to the page to play the quiz and pass the quiz id
	const onCreateButtonClick = (name: string) => {
		console.log(`create ${name}`);
		
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
					<button className="btn btn-primary" onClick={() => onCreateButtonClick(newName)}>Create</button>
				}
			</div>
			{quizzes ? (
				<ul>
					{quizzes.map((quiz: { name: string, id: number }) => (
						// Everything list items should contain the name and id (id is in the button to send data)
						<li key={quiz.name}>
							{/*<Quiz*/}
							{/*	name={quiz.name}*/}
							{/*	id={quiz.id}*/}
							{/*	onPlayButtonClick={() => onPlayButtonClick(quiz.name, quiz.id)}*/}
							{/*/>*/}
							<p>{quiz.name}</p>
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
};

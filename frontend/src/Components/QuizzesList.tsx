import {Quiz} from "@/Components/Quiz.tsx";
import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

// Display all quizzes and a button to navigate users to a page where they can quiz themselves
export const QuizzesList = () => {
	// Initial list of quizzes
	const [quizzes, setQuizzes] = useState([]);
	
	const navigate = useNavigate();
	
	// Get all quizzes
	useEffect(() => {
		const getQuizzes = async () => {
			const quizzesRes = await axios.get("http://localhost:8080/quizzes");
			return quizzesRes.data;
		};
		
		getQuizzes().then(setQuizzes);
	}, []);
	
	// When the play button is clicked, go to the page to play the quiz and pass the quiz id
	const onPlayButtonClick = (name, id) => {
		console.log(`play ${name} ${id}`);
		
		// Navigate to the questions page
		navigate("/questions", { state: {name, id} });
	};
	
	// Build a list of quizzes using map()
	return (
		<div>
			<h2>Select a Quiz:</h2>
			{quizzes ? (
				<ul>
					{quizzes.map((quiz: { name: string, id: number }) => (
						// Everything list items should contain the name and id (id is in the button to send data)
						<li key={quiz.name}>
							<Quiz
								name={quiz.name}
								id={quiz.id}
								onPlayButtonClick={() => onPlayButtonClick(quiz.name, quiz.id)}
							/>
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
};

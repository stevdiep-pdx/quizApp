import {Quiz} from "@/Components/Quiz.tsx";
import {QuizService} from "@/Services/QuizService.tsx";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

// Display all quizzes and a button to navigate users to a page where they can quiz themselves
export const QuizList = () => {
	// Initial list of quizzes
	const [quizzes, setQuizzes] = useState([]);
	
	const navigate = useNavigate();
	
	// Get all quizzes
	useEffect(() => {
		const getQuizzes = async () => {
			const quizzesRes = await QuizService.send();
			return quizzesRes.data;
		};
		
		getQuizzes().then(setQuizzes);
	}, []);
	
	// When the play button is clicked, go to the page to play the quiz and pass the quiz id
	const onPlayButtonClick = (name: string, id: number) => {
		console.log(`play ${name} ${id}`);
		
		// Navigate to the questions page
		navigate("/questions", { state: {name, id, challenge: 0} });
	};
	
	// When the play challenge button is clicked, get the id of the current challenge and play the quiz
	const onPlayChallengeButtonClick = () => {
		// Get the current challenge quiz
		QuizService.random()
			.then((response) => {
				console.log("nav next challenge", response.data.id);
				
				// Save the fields of the random quiz and pass them
				const id = response.data.id;
				const name = response.data.name;
				
				// Navigate to the questions page
				navigate("/questions", { state: {name, id, challenge: 1} });
			})
			.catch(err => console.log(err));
	};
	
	// Build a list of quizzes using map()
	return (
		<div>
			<h2>Select a Quiz:</h2>
			<ul>
				<li key="rotationalQuiz">
					<Quiz
						name="Quiz of the Hour!"
						id={-1}
						onPlayButtonClick={onPlayChallengeButtonClick}
					/>
				</li>
			</ul>
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

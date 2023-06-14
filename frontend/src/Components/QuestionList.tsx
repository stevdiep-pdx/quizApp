import {Question} from "@/Components/Question.tsx";
import {useAuth} from "@/Services/Auth.tsx";
import {LeaderboardService} from "@/Services/LeaderboardService.tsx";
import {QuestionService} from "@/Services/QuestionService.tsx";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

/** This is a component to play the quiz and display the question
 *
 * @component
 */
export const QuestionList = () => {
	// Initial variables
	const [questions, setQuestions] = useState([]);
	const [index, setIndex] = useState(0);
	const [score, setScore] = useState(0);
	
	// Get variables sent in from the other page and the user id from auth
	const auth = useAuth();
	const location = useLocation();
	
	// Get all questions when the page is rendered
	useEffect(() => {
		// Get all questions
		const getQuestions = async (id) => {
			return QuestionService.search(id);
		};
		
		getQuestions(location.state.id).then(setQuestions);
	}, []);
	
	useEffect(() => {
		// Update the leaderboard once you hit the end of the quiz
		if(index == questions.length && location.state.challenge) {
			
			if(auth.token) {
				console.log("update leaderboard here score auth: ", score);
				
				LeaderboardService.put(auth.userId, score);
			}
		}
	}, [index]);
	
	// When an option is clicked
	const onOptionClick = (guess: string, answer: string) => {
		// Increase the index to get the next question
		if(index < questions.length) {
			setIndex(index + 1);
			console.log("index after ", index, " length ", questions.length);
		}
		
		// Check the answer they gave and see if it is correct; if it is, add a point
		if (guess === answer) {
			setScore(score + 1);
		}
	};
	
	// If the questions list is not empty (length != 0) and we haven't reached the end of the quiz, questions
	// Increment the index to display the next question
	return (
		<div>
			{questions.length != 0 && index < questions.length ? (
				<div>
					<h2 className="text-center text-2xl mt-4">{questions[index].question}</h2>
					<Question
						answer={questions[index].answer}
						option2={questions[index].option2}
						option3={questions[index].option3}
						option4={questions[index].option4}
						onOptionClick={(guess, answer) => onOptionClick(guess, answer)}
					/>
				</div>
			) : <h2 className="text-center text-2xl mt-4">No more questions</h2>}
			<p className="text-center">Total score: {score}</p>
		</div>
	);
};



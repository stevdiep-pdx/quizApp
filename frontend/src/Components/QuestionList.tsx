import {Question} from "@/Components/Question.tsx";
import {QuestionService} from "@/Services/QuestionService.tsx";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

export const QuestionList = () => {
	// Initial variables
	const [questions, setQuestions] = useState([]);
	const [index, setIndex] = useState(0);
	const [score, setScore] = useState(0);
	
	// Get variables sent in from the other page
	const location = useLocation();
	
	// Get all questions when the page is rendered
	useEffect(() => {
		// Get all questions
		const getQuestions = async (id) => {
			return QuestionService.search(id);
		};
		
		getQuestions(location.state.id).then(setQuestions);
	}, [location.state.id]);
	
	// When an option is clicked
	const onOptionClick = (guess: string, answer: string) => {
		
		// Check the answer they gave and see if it is correct; if it is, add a point
		if (guess === answer)
			setScore(score + 1);
		
		// Increase the index to get the next question
		if(index < questions.length) {
			setIndex(index + 1);
			console.log("index after ", index, " length ", questions.length);
		}
		
		if(index == questions.length - 1 && location.state.challenge)
			console.log("update leaderboard here");
	};
	
	// If the questions list is not empty (length != 0) and we haven't reached the end of the quiz, questions
	// Increment the index to display the next question
	return (
		<div>
			<h1>Questions for the Quiz: {location.state.name} id: {location.state.id}</h1>
			{questions.length != 0 && index < questions.length ? (
				<div>
					<p>{questions[index].question}</p>
					<Question
						answer={questions[index].answer}
						option2={questions[index].option2}
						option3={questions[index].option3}
						option4={questions[index].option4}
						onOptionClick={(guess, answer) => onOptionClick(guess, answer)}
					/>
				</div>
			) : <p>No more questions</p>}
			<p>Total score: {score}</p>
		</div>
	);
};



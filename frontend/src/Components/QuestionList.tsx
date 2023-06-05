import {Question} from "@/Components/Question.tsx";
import {Quiz} from "@/Components/Quiz.tsx";
import {QuestionType} from "@/QuizTypes.ts";
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
			const questionRes = await QuestionService.send(id);
			console.log("res", questionRes);
			return questionRes;
		};
		
		getQuestions(location.state.id).then(setQuestions);
	}, [location.state.id]);
	
	const onOptionClick = () => {
		if(index < questions.length - 1)
			setIndex(index + 1);
	};
	
	// If the questions list is not empty (length != 0), display the first question
	// Increment the index to display the next question
	return (
		<div>
			<h1>Questions for the Quiz: {location.state.name} id: {location.state.id}</h1>
			{questions.length != 0 ? (
				<div>
					<p>{questions[index].question}</p>
					<Question
						answer={questions[index].answer}
						option2={questions[index].option2}
						option3={questions[index].option3}
						option4={questions[index].option4}
						onOptionClick={() => onOptionClick()}
					/>
					<p>Total score: {score}</p>
				</div>
			) : null}
		</div>
	);
};



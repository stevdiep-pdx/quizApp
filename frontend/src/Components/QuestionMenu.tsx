import {QuestionToEdit} from "@/Components/QuestionToEdit.tsx";
import {useAuth} from "@/Services/Auth.tsx";
import {QuestionService} from "@/Services/QuestionService.tsx";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

export const QuestionMenu = () => {
	// Get variables sent in from the other page
	const location = useLocation();
	
	// Initial list of quizzes
	const [questions, setQuestions] = useState([]);
	const [newName, setNewName] = useState(location.state.name);
	
	const auth = useAuth();					// Used to get user id
	
	// Call the service to get the questions owned by the quiz
	const getQuestions = async () => {
		const questionsRes = await QuestionService.search(location.state.quiz_id);
		console.log(questionsRes);
		return questionsRes;
	};

	// Get all questions
	useEffect(() => {
		getQuestions().then(setQuestions);
	}, []);
	
	// When the delete button is clicked, delete the quiz
	const onDeleteButtonClick = (id: number) => {
		console.log(`delete ${id}`);
		
		// Delete the quiz
		// QuizService.delete(id)
		// 	.then(() => {
		// 		console.log("deleted");
		//
		// 		// Update the state by getting the new list
		// 		getQuizzes().then(setQuizzes);
		// 	})
		// 	.catch(err => console.log(err));
	};
	
	// When the edit button is clicked, go to the page to edit the quiz and pass the quiz id
	const onEditButtonClick = (question: string, answer: string, option2: string, option3: string, option4: string, question_id: number) => {
		console.log(`edit ${question_id}`);
		
		// Navigate to the questions page
		// navigate("/profile/questions", { state: {name, quiz_id} });
	};
	
	// When the create button is clicked, make a request and go to the page to edit the quiz and pass the quiz id
	const onCreateButtonClick = (name: string, id: number) => {
		console.log(`create ${name} by user ${id}`);
		
		// Variable to hold quiz id, will later be passed
		// let quiz_id = 0;
		//
		// // Make a new quiz
		// QuizService.post(id, name)
		// 	.then((response) => {
		// 		console.log("nav next", response.data.id);
		//
		// 		// Save the quiz id
		// 		quiz_id = response.data.id;
		//
		// 		// Update the state by getting the new list and clearing the input
		// 		setNewName("");
		// 		getQuizzes().then(setQuizzes);
		//
		// 		// Navigate to the questions page
		// 		navigate("/profile/questions", { state: {name, quiz_id} });
		// 	})
		// 	.catch(err => console.log(err));
	};
	
	return (
		<div>
			<h1>Editing quiz: {location.state.name} id: {location.state.quiz_id}</h1>
			{/*<div>*/}
			{/*	<label htmlFor="newQuiz">New Quiz: </label>*/}
			{/*	<input*/}
			{/*		placeholder="Name..."*/}
			{/*		type="text"*/}
			{/*		id="newQuiz"*/}
			{/*		required*/}
			{/*		value={newName}*/}
			{/*		onChange={e => setNewName(e.target.value)}*/}
			{/*		name="newQuiz"*/}
			{/*		className="input input-bordered"*/}
			{/*	/>*/}
			{/*	{*/}
			{/*		newName != "" &&*/}
      {/*    <button className="btn btn-primary" onClick={() => onCreateButtonClick(newName, auth.userId)}>Create</button>*/}
			{/*	}*/}
			{/*</div>*/}
			{questions ? (
				<ul>
					{questions.map((question: { question: string, answer: string, option2: string, option3: string, option4: string, id: number }) => (
						// Everything list items should contain the name and id
						<li key={question.question}>
							<QuestionToEdit
								question={question.question}
								answer={question.answer}
								option2={question.option2}
								option3={question.option3}
								option4={question.option4}
								id={question.id}
								onEditButtonClick={(question, answer, option2, option3, option4, id) => onEditButtonClick(question, answer, option2, option3, option4, id)}
								onDeleteButtonClick={(id: number) => onDeleteButtonClick(id)}
							/>
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
};

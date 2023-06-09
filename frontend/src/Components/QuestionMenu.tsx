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
	const [newQuestion, setQuestion] = useState("");
	const [newAnswer, setAnswer] = useState("");
	const [newOption2, setOption2] = useState("");
	const [newOption3, setOption3] = useState("");
	const [newOption4, setOption4] = useState("");
	
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
		QuestionService.delete(id)
			.then(() => {
				console.log("deleted");

				// Update the state by getting the new list
				getQuestions().then(setQuestions);
			})
			.catch(err => console.log(err));
	};
	
	// When the edit button is clicked, pass of fields to the question service
	const onEditButtonClick = (question: string, answer: string, option2: string, option3: string, option4: string, question_id: number) => {
		console.log(`edit ${question_id}`);
		
		// Call the update service
		QuestionService.put(question_id, question, answer, option2, option3, option4)
			.then(() => {
			console.log("deleted");
			
			// Update the state by getting the new list
			getQuestions().then(setQuestions);
		})
			.catch(err => console.log(err));
	};
	
	// When the create button is clicked, make a request and go to the page to edit the quiz and pass the quiz id
	const onCreateButtonClick = (question: string, answer: string, option2: string, option3: string, option4: string, quiz_id: number) => {
		console.log(`create ${question} by for ${quiz_id}`);

		// Make a new quiz
		QuestionService.post(quiz_id, question, answer, option2, option3, option4)
			.then(() => {
				console.log("nav next");

				// Update the state by getting the new list
				getQuestions().then(setQuestions);
			})
			.catch(err => console.log(err));
	};
	
	return (
		<div>
			<h1>Editing quiz: {location.state.name} id: {location.state.quiz_id}</h1>

			<ul>
				<li key="create">
					<QuestionToEdit
						header={"Create a new question"}
						question={""}
						answer={""}
						option2={""}
						option3={""}
						option4={""}
						id={location.state.quiz_id}
						onEditButtonClick={(question, answer, option2, option3, option4, id) => onCreateButtonClick(question, answer, option2, option3, option4, id)}
						onDeleteButtonClick={null}
					/>
				</li>

			</ul>
			{questions ? (
				<ul>
					{questions.map((question: { question: string, answer: string, option2: string, option3: string, option4: string, id: number }) => (
						// Everything list items should contain the name and id
						<li key={question.question}>
							<QuestionToEdit
								header={question.question}
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

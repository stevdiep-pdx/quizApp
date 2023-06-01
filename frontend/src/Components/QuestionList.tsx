import {QuestionService} from "@/Services/QuestionService.tsx";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

export const QuestionList = () => {
	// Initial list of questions
	const [questions, setQuestions] = useState([]);
	
	// Get variables sent in from the other page
	const location = useLocation();
	
	// Get all questions
	const getQuestions = async (id) => {
		QuestionService.send(id)
			.then(response => {
				console.log(response);
				setQuestions(response.data);
			})
			.catch(err => {
				console.error(err);
			});
	};
	
	// Get all questions when the page is rendered
	useEffect(() => {
		getQuestions(location.state.id).then(() => console.log("Got stuff"));
	}, [location.state.id]);
	
	return (
		<div>
			<h1>Questions for the Quiz: {location.state.name} id: {location.state.id}</h1>
			<Subtitle />
		</div>
	);
};

export function Title() {
	return <h1>Unused</h1>;
}

export function Subtitle() {
	return <h3>Test your knowledge</h3>;
}

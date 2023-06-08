import {useLocation} from "react-router-dom";

export const QuestionMenu = () => {
	// Get variables sent in from the other page
	const location = useLocation();
	
	return (
		<div>
			<h1>Editing quiz: {location.state.name} id: {location.state.quiz_id}</h1>
			
		</div>
	);
};

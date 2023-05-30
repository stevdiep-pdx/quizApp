import {useLocation} from "react-router-dom";

export const QuestionsList = () => {
	// Get variables sent in from the other page
	const location = useLocation();
	
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

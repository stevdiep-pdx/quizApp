import "@css/QuizStyles.css";

export type QuestionProps = {
	answer: string;
	option2: string;
	option3: string;
	option4: string;
	onOptionClick: (guess: string, answer: string) => void;
};

/** This is a component to display a question and its set of options
 *
 * @component
 */
export function Question(props: QuestionProps) {
	// Define the props
	const { answer, option2, option3, option4, onOptionClick } = props;
	
	// Make a set of questions
	const answerSet = [answer, option2, option3, option4];
	
	// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	// Randomize the set of questions
	for(let i = answerSet.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = answerSet[i];
		answerSet[i] = answerSet[j];
		answerSet[j] = temp;
	}
	
	// The quiz and how it should look
	return (
		<div className={"rounded-box bg-orange-100 w-4/5 mx-auto p-4 my-5 text-center"}>
			<button className="btn btn-warning w-4/5 m-5" onClick={() => onOptionClick(answerSet[0], answer)}>{answerSet[0]}</button>
			<button className="btn btn-warning w-4/5 m-5" onClick={() => onOptionClick(answerSet[1], answer)}>{answerSet[1]}</button>
			<button className="btn btn-warning w-4/5 m-5" onClick={() => onOptionClick(answerSet[2], answer)}>{answerSet[2]}</button>
			<button className="btn btn-warning w-4/5 m-5" onClick={() => onOptionClick(answerSet[3], answer)}>{answerSet[3]}</button>
		</div>
	);
}

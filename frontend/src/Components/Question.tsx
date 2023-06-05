import "@css/QuizStyles.css";

export type QuestionProps = {
	answer: string;
	option2: string;
	option3: string;
	option4: string;
	onOptionClick: (guess: string, answer: string) => void;
};

export function Question(props: QuestionProps) {
	// Define the props
	const { answer, option2, option3, option4, onOptionClick } = props;
	
	// Make a set of questions
	const answerSet = [answer, option2, option3, option4];
	
	// Randomize the set of questions
	for(let i = answerSet.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = answerSet[i];
		answerSet[i] = answerSet[j];
		answerSet[j] = temp;
	}
	
	// The quiz and how it should look
	return (
		<div className={"rounded-box bg-slate-700 w-4/5 mx-auto"}>
			<div className={"space-x-8 my-1"}>
				<p>Select an option</p>
				<button className="btn bg-slate-500 w-4/5 m-5" onClick={() => onOptionClick(answerSet[0], answer)}>{answerSet[0]}</button>
				<button className="btn bg-slate-500 w-4/5 m-5" onClick={() => onOptionClick(answerSet[1], answer)}>{answerSet[1]}</button>
				<button className="btn bg-slate-500 w-4/5 m-5" onClick={() => onOptionClick(answerSet[2], answer)}>{answerSet[2]}</button>
				<button className="btn bg-slate-500 w-4/5 m-5" onClick={() => onOptionClick(answerSet[3], answer)}>{answerSet[3]}</button>
			</div>
		</div>
	);
}

import "@css/QuizStyles.css";
import {useState} from "react";

export type QuestionProps = {
	header: string;
	question: string;
	answer: string;
	option2: string;
	option3: string;
	option4: string;
	id: number;
	onEditButtonClick: (question: string, answer: string, option2: string, option3: string, option4: string, id: number) => void;
	onDeleteButtonClick: (id: number) => void;
};

/** This is a component to display the question being edited
 *
 * @component
 */
export function QuestionToEdit(props: QuestionProps) {
	// Define the props
	const { header, question, answer, option2, option3, option4, id, onEditButtonClick, onDeleteButtonClick } = props;
	
	// Define the states
	const [newQuestion, setQuestion] = useState(question);
	const [newAnswer, setAnswer] = useState(answer);
	const [newOption2, setOption2] = useState(option2);
	const [newOption3, setOption3] = useState(option3);
	const [newOption4, setOption4] = useState(option4);
	
	// The question and textboxes for editing its fields
	return (
		<div className={"rounded-box bg-orange-100 w-4/5 mx-auto p-4 my-5 text-center"}>
			<h2 className={"text-3xl"}>{header}</h2>
			
			<div>
				<label className="inline-block w-1/12" htmlFor="newQuestion">Question</label>
				<input
					placeholder="Question..."
					type="text"
					id="newQuestion"
					required
					value={newQuestion}
					onChange={e => setQuestion(e.target.value)}
					name="newQuestion"
					className="input input-bordered w-4/5 my-2"
				/>
			</div>
			
			<div>
				<label className="inline-block w-1/12" htmlFor="newAnswer">Answer</label>
				<input
					placeholder="Answer..."
					type="text"
					id="newAnswer"
					required
					value={newAnswer}
					onChange={e => setAnswer(e.target.value)}
					name="newAnswer"
					className="input input-bordered w-4/5 my-2"
				/>
			</div>
			
			<div>
				<label className="inline-block w-1/12" htmlFor="newOption2">Option 2</label>
				<input
					placeholder="Option..."
					type="text"
					id="newOption2"
					required
					value={newOption2}
					onChange={e => setOption2(e.target.value)}
					name="newOption2"
					className="input input-bordered w-4/5 my-2"
				/>
			</div>
			
			<div>
				<label className="inline-block w-1/12" htmlFor="newOption3">Option 3</label>
				<input
					placeholder="Option..."
					type="text"
					id="newOption3"
					required
					value={newOption3}
					onChange={e => setOption3(e.target.value)}
					name="newOption3"
					className="input input-bordered w-4/5 my-2"
				/>
			</div>
			
			<div>
				<label className="inline-block w-1/12" htmlFor="newOption4">Option 4</label>
				<input
					placeholder="Option..."
					type="text"
					id="newOption4"
					required
					value={newOption4}
					onChange={e => setOption4(e.target.value)}
					name="newOption4"
					className="input input-bordered w-4/5 my-2"
				/>
			</div>
			
			<div className={"space-x-8 my-1"}>
				{newQuestion != "" && newAnswer != "" && newOption2 != "" && newOption3 != "" && newOption4 != "" &&
          <button className="btn btn-outline btn-circle" onClick={() => onEditButtonClick(newQuestion, newAnswer, newOption2, newOption3, newOption4, id)}>{onDeleteButtonClick ? "Update" : "Create"}</button>
				}
				{onDeleteButtonClick ? <button className="btn btn-outline btn-circle" onClick={() => onDeleteButtonClick(id)}>Delete</button> : null}
			</div>
		</div>
	);
}

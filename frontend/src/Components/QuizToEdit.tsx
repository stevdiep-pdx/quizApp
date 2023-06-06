import "@css/QuizStyles.css";

export type QuizProps = {
	name: string;
	id: number;
	onEditButtonClick: (name: string, id: number) => void;
	onDeleteButtonClick: () => void;
};

export function Quiz(props: QuizProps) {
	// Define the props
	const { name, id, onEditButtonClick, onDeleteButtonClick } = props;

	// The quiz and how it should look
	return (
		<div className={"rounded-box bg-slate-700 w-4/5 mx-auto"}>
			<h2 className={"text-4xl text-blue-600"}>{name}</h2>
			<div className={"space-x-8 my-1"}>
				<button className="btn btn-circle" onClick={() => onEditButtonClick(name, id)}>Edit</button>
				<button className="btn btn-circle" onClick={() => onDeleteButtonClick()}>Delete</button>
			</div>
		</div>
	);
}

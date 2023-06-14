import "@css/QuizStyles.css";

export type QuizProps = {
	name: string;
	id: number;
	onEditButtonClick: (name: string, id: number) => void;
	onDeleteButtonClick: (id: number) => void;
};

/** This is a component to display a quiz that can be edited
 *
 * @component
 */
export function QuizToEdit(props: QuizProps) {
	// Define the props
	const { name, id, onEditButtonClick, onDeleteButtonClick } = props;

	// The quiz and how it should look
	return (
		<div className={"rounded-box bg-orange-100 w-4/5 mx-auto p-4 my-5"}>
			<h2 className={"text-3xl"}>{name}</h2>
			<div className={"space-x-8 my-1"}>
				<button className="btn btn-outline btn-circle" onClick={() => onEditButtonClick(name, id)}>Edit</button>
				<button className="btn btn-outline btn-circle" onClick={() => onDeleteButtonClick(id)}>Delete</button>
			</div>
		</div>
	);
}

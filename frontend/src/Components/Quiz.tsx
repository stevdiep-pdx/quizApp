import "@css/QuizStyles.css";

export type QuizProps = {
	name: string;
	id: number;
	onPlayButtonClick: (name: string, id: number) => void;
};

/** This is a component to display a quiz
 *
 * @component
 */
export function Quiz(props: QuizProps) {
	// Define the props
	const { name, id, onPlayButtonClick } = props;
	
	// The quiz and how it should look
	return (
		<div className={"rounded-box bg-orange-100 w-4/5 mx-auto p-4 my-5"}>
			<h2 className={"text-3xl"}>{name}</h2>
			{id < 0 ? <p>You must be logged to be on the leaderboard</p> : null}
			<div className={"space-x-8 my-1"}>
				<button className="btn btn-outline btn-circle" onClick={() => onPlayButtonClick(name, id)}>Play</button>
			</div>
		</div>
	);
}

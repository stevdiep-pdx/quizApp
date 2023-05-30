import { ProfileType } from "@/QuizTypes.ts";
import { useEffect } from "react";
import "@css/QuizStyles.css";

export type QuizProps = {
	name: string;
	id: number;
	onPlayButtonClick: (name, id) => void;
};

export function Quiz(props: QuizProps) {
	// Define the props
	const { name, id, onPlayButtonClick } = props;
	
	// The quiz and how it should look
	return (
		<div className={"rounded-box bg-slate-700 w-4/5 mx-auto"}>
			<h2 className={"text-4xl text-blue-600"}>{name}</h2>
			<div className={"space-x-8 my-1"}>
				<button className="btn btn-circle" onClick={() => onPlayButtonClick(name, id)}>Play</button>
			</div>
		</div>
	);
}

import "@css/QuizStyles.css";
import {UserService} from "@/Services/UserService.tsx";
import {useEffect, useState} from "react";

export type ScoreProps = {
	player: number;
	score: number;
};

/** This is a component to display the score on the leaderboard
 *
 * @component
 */
export function Score(props: ScoreProps) {
	// Define the props
	const { player, score } = props;
	
	// State to hold the user's name
	const [name, setName] = useState("");
	
	// Get the username of the player
	useEffect(() => {
		// Get all questions
		const getPlayer = async () => {
			return UserService.search(player);
		};
		
		getPlayer().then((response) => setName(response.name));
	}, []);
	
	// The quiz and how it should look
	return (
		<>
			<p className="inline">{name} &emsp; &emsp;</p>
			<p className="inline font-bold float-right">{score}</p>
		</>
		
	);
}

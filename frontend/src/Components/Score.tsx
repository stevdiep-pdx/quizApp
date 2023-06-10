import "@css/QuizStyles.css";
import {UserService} from "@/Services/UserService.tsx";
import {useEffect, useState} from "react";

export type ScoreProps = {
	player: number;
	score: number;
};

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
		<p>{name} score {score}</p>
	);
}

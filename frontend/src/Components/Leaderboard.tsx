import {Score} from "@/Components/Score.tsx";
import {LeaderboardService} from "@/Services/LeaderboardService.tsx";
import {useEffect, useState} from "react";

export const Leaderboard = () => {
	const [scores, setScores] = useState([]);
	
	// Get all questions when the page is rendered
	useEffect(() => {
		// Get all questions
		const getScores = async () => {
			return LeaderboardService.get();
		};
		
		getScores().then((response) => setScores(response.data));
	}, []);
	
	// If the questions list is not empty (length != 0) and we haven't reached the end of the quiz, questions
	// Increment the index to display the next question
	return (
		<div>
			<h2>Leaderboard:</h2>
			{scores ? (
				<ol>
					{scores.map((score: { player: number, score: number }) => (
						// Everything list items should contain the name and id (id is in the button to send data)
						<li key={score.player}>
							<Score
								player={score.player}
								score={score.score}
							/>
						</li>
					))}
				</ol>
			) : null}
		</div>
	);
};
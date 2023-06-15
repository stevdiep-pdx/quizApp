import {Score} from "@/Components/Score.tsx";
import {LeaderboardService} from "@/Services/LeaderboardService.tsx";
import {useEffect, useState} from "react";

/** This is a component to display the leaderboard
 *
 * @component
 */
export const Leaderboard = () => {
	const [scores, setScores] = useState([]);
	
	// Get all questions when the page is rendered
	useEffect(() => {
		// Get all questions
		const getScores = async () => {
			return LeaderboardService.get();
		};
		
		getScores().then((response) => {
			// https://www.w3schools.com/js/js_array_sort.asp
			// Sort the array then set it
			setScores(
				response.data.sort(function(a, b){return b.score - a.score;})
			);
		});
	}, []);
	
	// If the questions list is not empty (length != 0) and we haven't reached the end of the quiz, questions
	// Increment the index to display the next question
	return (
		<div className="mx-auto flex flex-col items-center">
			<h2  className="text-center text-2xl mt-4">Leaderboard</h2>
			{scores ? (
				<ol className="list-decimal list-inside">
					{scores.map((score: { player: number, score: number }) => (
						// Everything list items should contain the name and id (id is in the button to send data)
						<li key={score.player} className="rounded-box bg-orange-100 px-5 my-4 text-xl">
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

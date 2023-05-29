export const Home = () => {
	return (
		<div>
			<Title />
			<Subtitle />
		</div>
	);
};

export function Title() {
	return <h1>Quiz</h1>;
}

export function Subtitle() {
	return <h3>Test your knowledge</h3>;
}

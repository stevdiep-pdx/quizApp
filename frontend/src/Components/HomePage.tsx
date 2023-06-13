export const Home = () => {
	return (
		<div className="bg-gradient-to-r from-orange-100 to-pink-200 w-full mx-auto p-4 py-28">
			<Title />
			<Subtitle />
		</div>
	);
};

export function Title() {
	return <h1 className="text-center text-5xl">Quizr</h1>;
}

export function Subtitle() {
	return <h2 className="text-center text-3xl">Test your Knowledge!</h2>;
}

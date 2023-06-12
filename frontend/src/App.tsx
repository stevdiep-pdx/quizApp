import { QuizRouter } from "@/QuizRoutes.tsx";
import { AuthProvider } from "@/Services/Auth.tsx";
import { BrowserRouter } from "react-router-dom";
import "@css/QuizStyles.css";

// This is our base React Component
export function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<div className="App quiz">
					<QuizRouter/>
				</div>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;

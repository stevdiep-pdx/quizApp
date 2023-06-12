import { Home } from "@/Components/HomePage.tsx";
import {Leaderboard} from "@/Components/Leaderboard.tsx";
import { Login } from "@/Components/Login.tsx";
import { Logout } from "@/Components/Logout.tsx";
import {Profile} from "@/Components/Profile.tsx";
import { ProtectedRoute } from "@/Components/ProtectedRoute.tsx";
import {QuestionList} from "@/Components/QuestionList.tsx";
import {QuestionMenu} from "@/Components/QuestionMenu.tsx";
import {QuizMenu} from "@/Components/QuizMenu.tsx";
import {QuizList} from "@/Components/QuizList.tsx";
import {SignUp} from "@/Components/SignUp.tsx";
import { useAuth } from "@/Services/Auth.tsx";
import { Link, Route, Routes } from "react-router-dom";
import "@css/QuizStyles.css";

export function QuizRouter() {
	const auth = useAuth();

	return (
		<div className={"quizfancy"}>
			<nav className="bg-indigo-600 shadow-lg text-white">
				<div className="navbar justify-center">
					<div className={"navbar-center lg:flex"}>

						<ul className={"menu menu-horizontal"}>
							<li><Link to="/">Home</Link></li>
							<li><Link to="/quizzes">Quizzes</Link></li>
							<li><Link to="/leaderboard">Leaderboard</Link></li>
							{auth?.token != null ? (
								<>
									<li><Link to="/profile/quizzes">Your Quizzes</Link></li>
									<li><Link to="/profile">Your Profile</Link></li>
									<li><Link to="/logout">Logout</Link></li>
								</>
							) : (
								<>
									<li><Link to="/login"> Login</Link></li>
									<li><Link to="/create"> Create Account</Link> </li>
								</>
							)}</ul>

					</div>
				</div>
			</nav>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/profile/quizzes" element={<ProtectedRoute><QuizMenu /></ProtectedRoute>} />
				<Route path="/profile/questions" element={<ProtectedRoute><QuestionMenu /></ProtectedRoute>} />
				<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
				<Route path="/create" element={<SignUp />}/>
				<Route path="/login" element={<Login />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/quizzes" element={<QuizList />} />
				<Route path="/leaderboard" element={<Leaderboard />} />
				<Route path="/questions" element={<QuestionList />} />
			</Routes>
		</div>
	);
}


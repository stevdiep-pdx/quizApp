import { useAuth } from "@/Services/Auth.tsx";
import { Navigate } from "react-router-dom";

/** This is a component to protect routes
 *
 * @component
 */
export const ProtectedRoute = ({children}) => {
	const {token} = useAuth();

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

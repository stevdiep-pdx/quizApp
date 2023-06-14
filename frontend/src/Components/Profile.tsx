import {useAuth} from "@/Services/Auth.tsx";
import {UserService} from "@/Services/UserService.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

/** This is a component to display the profile
 *
 * @component
 */
export const Profile = () => {
	// State to hold the user's name
	const [name, setName] = useState("");
	
	// Used to get the user's id and navigate
	const auth = useAuth();
	const navigate = useNavigate();
	
	const deleteAccount = () => {
		// Logout
		async function processLogout() {
			if(auth) {
				await auth.handleLogout();
				navigate("/");
			} else {
				console.error("Authorization is missing somehow");
				navigate("/");
			}
		}
		
		// After logging out, delete the account
		processLogout().then( () => {
			UserService.delete(auth.userId);
			console.log("Logout completed successfully");
		});
	};
	
	// Get the username of the player
	useEffect(() => {
		// Get all questions
		const getPlayer = async () => {
			return UserService.search(auth.userId);
		};
		
		getPlayer().then((response) => setName(response.name));
	}, []);
	
	// Button to update the username
	// When an option is clicked
	const onUpdateButtonClick = (name: string, id: number) => {
		// Update the username
		UserService.put(id, name)
			.then(() => setName(name));
	};
	
	return (
		<div className="text-center">
			<h2 className="text-center text-2xl mt-4">Profile</h2>
			<label htmlFor="name">Username: </label>
			<input
				placeholder="Name..."
				type="text"
				id="name"
				required
				value={name}
				onChange={e => setName(e.target.value)}
				name="name"
				className="input input-bordered"
			/>
			{
				name != "" &&
        <button className="btn btn-primary" onClick={() => onUpdateButtonClick(name, auth.userId)}>Update</button>
			}
			<div>
				<button className="btn btn-primary" onClick={deleteAccount}>Delete Account</button>
			</div>
		</div>
	);
};

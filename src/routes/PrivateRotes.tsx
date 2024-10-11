import { Navigate } from "react-router-dom";
// import { useLocalStorage } from "@uidotdev/usehooks";

// Helper function to check if user is logged in (based on token in localStorage)
const isAuthenticated = () => {
	return !!localStorage.getItem("userDetail"); // Adjust this logic based on how you store user data (e.g., token, user object)
};

// PrivateRoute component to protect certain routes
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
	return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;

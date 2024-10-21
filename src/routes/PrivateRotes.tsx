import { Navigate } from "react-router-dom";

// Helper function to check if user is authenticated and if CmpId exists
const isAuthenticated = () => {
	// Check if both "userDetail" and "CmpId" exist in localStorage
	const userDetail = localStorage.getItem("userDetail");
	const cmpId = localStorage.getItem("CmpId");
	return !!userDetail && !!cmpId; // Return true if both exist, otherwise false
};

// PrivateRoute component to protect certain routes
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
	return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;

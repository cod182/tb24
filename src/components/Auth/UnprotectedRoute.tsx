import { Navigate } from 'react-router-dom';
import React from 'react';

interface ProtectedRouteProps {
	children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	// Check if user data exists in sessionStorage
	const storedUser = sessionStorage.getItem('user');
	const user = storedUser ? JSON.parse(storedUser) : null;

	// Redirect to Dash if the user is logged in
	if (user) {
		return <Navigate to="/dashboard" />;
	}

	return children;
};

export default ProtectedRoute;

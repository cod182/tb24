import { Navigate } from 'react-router-dom';
import React from 'react';

interface ProtectedRouteProps {
	children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	// Check if user data exists in sessionStorage
	const storedUser = sessionStorage.getItem('user');
	const user = storedUser ? JSON.parse(storedUser) : null;

	// Redirect to login if the user is not logged in
	if (!user || user.id === 0) {
		return <Navigate to="/" />;
	}

	return children;
};

export default ProtectedRoute;

import { Navigate } from 'react-router-dom';
import React from 'react';
import { useGlobalContext } from '../../context/userAuthContext';

interface ProtectedRouteProps {
	children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { isLoggedIn, loading } = useGlobalContext();

	// Show loading indicator while checking auth status
	if (loading) return <div className='w-full h-full flex items-center justify-center animate-ping'>Loading...</div>;

	// Redirect to "/" if the user is not logged in
	return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;

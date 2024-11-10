import { Navigate } from 'react-router-dom';
import React from 'react';
import bgImage from '../../assets/media/images/dash-bg.webp';
import { useGlobalContext } from '../../context/userAuthContext';

interface ProtectedRouteProps {
	children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { user, isLoggedIn, loading } = useGlobalContext();

	// Show loading indicator while checking auth status
	if (loading) {
		return (
			<div className='w-full h-full flex items-center justify-center min-h-[100dvh] relative'>
				<img
					src={bgImage}
					alt="Background"
					className='absolute top-0 left-0 select-none h-full w-full z-[-1] blur-sm object-cover'
				/>
				<h1 className='text-center text-white animate-ping' aria-live="assertive">
					Loading...
				</h1>
			</div>
		);
	}

	// Redirect to "/" if the user is not logged in
	if (!isLoggedIn || !user) {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default ProtectedRoute;

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
	if (loading) return (
		<div className='w-full h-full flex items-center justify-center  min-h-[100dvh] relative'>
			<img src={bgImage} alt="background" className='absolute top-0 left-0 select-none h-full w-full z-[-1] blur-sm object-cover' />

			<h1 className='animate-ping'>
				Loading...
			</h1>
		</div>
	)

	// Redirect to "/" if the user is not logged in
	return isLoggedIn && user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;

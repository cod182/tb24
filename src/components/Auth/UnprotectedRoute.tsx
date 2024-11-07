import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/userAuthContext';

interface ProtectedRouteProps {
	children: JSX.Element;
}

const UnprotectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { isLoggedIn } = useGlobalContext();
	// Redirect to Dash if the user is logged in
	if (isLoggedIn) {
		return <Navigate to="/dashboard" />;
	}

	return children;
};

export default UnprotectedRoute;
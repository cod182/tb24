import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/userAuthContext';

interface ProtectedRouteProps {
	children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { user } = useGlobalContext();

	// Redirect to Dash if the user is logged in
	if (user) {
		return <Navigate to="/dashboard" />;
	}

	return children;
};

export default ProtectedRoute;

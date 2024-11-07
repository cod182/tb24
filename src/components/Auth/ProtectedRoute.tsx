import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/userAuthContext';

interface ProtectedRouteProps {
	children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { user } = useGlobalContext();

	// Redirect to login if the user is not logged in
	if (!user || user.id === 0) {
		return <Navigate to="/" />;
	}

	return children;
};

export default ProtectedRoute;

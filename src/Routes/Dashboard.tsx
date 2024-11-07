import { account } from '../lib/appwrite.js';
import { useGlobalContext } from '../context/userAuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
	const { setIsLoggedIn, setUser } = useGlobalContext();
	const navigate = useNavigate();
	return (
		<div>
			<button
				type="button"
				onClick={async () => {
					await account.deleteSessions();
					setUser(null);
					setIsLoggedIn(false);
					navigate('/');
				}}
			>
				Logout
			</button>
		</div>
	)
}

export default Dashboard
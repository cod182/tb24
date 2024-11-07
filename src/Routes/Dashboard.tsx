import { DashboardPanel } from '../components/index.js';
import { account } from '../lib/appwrite.js';
import bgImage from '../assets/media/images/dash-bg.webp';
import { useGlobalContext } from '../context/userAuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
	const { setIsLoggedIn, setUser } = useGlobalContext();
	const navigate = useNavigate();
	return (
		<div className='w-full min-h-[100dvh] relative'>
			{/* Background Image */}
			<img src={bgImage} alt="background" className='absolute top-0 left-0 select-none w-[100vw] h-[100vh] z-[-1] blur-sm object-cover' />

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

			<div className='w-full h-full p-8'>
				<DashboardPanel />
			</div>
		</div>
	)
}

export default Dashboard
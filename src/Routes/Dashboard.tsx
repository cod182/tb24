import { DashboardPanel } from '../components/index.js';
import { account } from '../lib/appwrite.js';
import bgImage from '../assets/media/images/dash-bg.webp';
import getGreeting from '../utils/functions.js';
import { useGlobalContext } from '../context/userAuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
	const navigate = useNavigate();

	const { user, setIsLoggedIn, setUser } = useGlobalContext();

	return (
		<div className='w-full h-[100dvh] relative'>
			{/* Background Image */}
			<img src={bgImage} alt="background" className='absolute top-0 left-0 select-none w-[100vw] h-[100vh] z-[-1] blur-sm object-cover' />



			<nav>
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
			</nav>

			{/* Heading */}
			<div className='w-full h-[100px] flex flex-row items-center justify-center my-6'>
				<p className='text-center capitalize text-9xl text-white'>Good {getGreeting()} {user && user.username}</p>
			</div>

			<div className='w-full h-fit p-4 sm:p-30 mx-auto mt-16'>
				<DashboardPanel />
			</div>
		</div>
	)
}

export default Dashboard
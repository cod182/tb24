import { DashboardPanel, Nav } from '../components/index.js';

import bgImage from '../assets/media/images/dash-bg.webp';
import getGreeting from '../utils/functions.js';
import { useGlobalContext } from '../context/userAuthContext';

const Dashboard = () => {

	const { user } = useGlobalContext();

	return (
		<div className='w-full min-h-[100dvh] relative'>

			{/* Background Image */}
			<img src={bgImage} alt="background" className='absolute top-0 left-0 select-none h-full w-full z-[-1] blur-sm object-cover' />

			<header className='w-full h-fit flex flex-row items-center justify-center mb-6 py-6 px-6 sm:px-12'>
				{/* <div className='absolute left-[30px] top-[20px]'> */}
				{/* Navigation */}
				<Nav />
				{/* </div> */}

				{/* Heading */}
				<div className='w-full h-full flex items-center justify-center pr-[45px] sm:pr-[130px] md:pr-[230px]'>
					<h1 className='text-center capitalize text-4xl md:text-6xl lg:text-8xl xl:text-9xl text-white'>Good {getGreeting()} {user && user.username}</h1>
				</div>

				<div></div>

			</header>

			<div className='w-full max-w-[1350px] h-fit p-4 sm:p-30 mx-auto mt-16'>
				<DashboardPanel />
			</div>
		</div>
	)
}

export default Dashboard
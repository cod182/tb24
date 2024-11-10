import { useEffect, useState } from 'react';

import { AuthForm } from '../components';
import { Navigate } from 'react-router-dom';
import bbImage from '../assets/media/images/auth-bg.webp';
import { useGlobalContext } from '../context/userAuthContext';

const Auth = () => {

	// UseStates
	const [isRegistering, setIsRegistering] = useState(false);

	// Functions
	const { isLoggedIn } = useGlobalContext();

	// clearing all cookies if not logged in
	useEffect(() => {
		const deleteCookie = (name: string) => {
			document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		}

		if (!isLoggedIn) {
			deleteCookie('a_session_console');
			deleteCookie('a_session_console_legacy');
			deleteCookie('a_session_672b37b90020abcae49f');
			deleteCookie('__stripe_sid');
			deleteCookie('__stripe_mid');

		}
	}, [])

	if (isLoggedIn) return <Navigate to="/dashboard" replace />;

	return (
		<div className='w-full h-[100dvh] flex flex-col items-center justify-center relative'>

			{/* Background Image */}
			<img src={bbImage} alt="background" className='absolute top-0 left-0 select-none w-[100vw] h-[100vh] z-[0] blur-sm object-cover' />

			<h1 className='mt-24 z-[1] text-[50px] select-none sm:text-[70px] text-white font-semibold text-center'>Dev Challenge</h1>

			{/* container */}
			<div className='w-full h-full m-12 z-[1]'>
				<AuthForm isRegistering={isRegistering} setIsRegistering={setIsRegistering} />
			</div>

		</div >

	);
};

export default Auth;

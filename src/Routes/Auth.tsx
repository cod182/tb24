import { AuthForm } from '../components';
import { useState } from 'react';

const Auth = () => {

	// UseStates
	const [isRegistering, setIsRegistering] = useState(false);

	// Functions

	const handleSubmit = () => {

	}


	return (
		<div className='w-full h-[100vh] flex flex-col items-center justify-center relative'>

			{/* Background Image */}
			<img src="" alt="background" className='absolute top-0 left-0 select-none w-[100vw] h-[100vh] z-[0]' />

			<h1 className='mt-24 text-[70px] text-white font-semibold'>Dev Challenge</h1>

			{/* container */}
			<div className='w-full h-full m-12 z-[1]'>
				<AuthForm isRegistering={isRegistering} setIsRegistering={setIsRegistering} handleSubmit={handleSubmit} />
			</div>

		</div >

	);
};

export default Auth;

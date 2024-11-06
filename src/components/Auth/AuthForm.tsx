import React from 'react'

type Props = {
	isRegistering: boolean;
	setIsRegistering: (state: boolean) => void;
	handleSubmit: (formData: HTMLFormElement) => void;
}
const AuthForm = ({ isRegistering, setIsRegistering, handlleSubmit }: Props) => {
	return (
		<div className='w-full h-full flex flex-col '>
			<form className='flex flex-col items-center justify-between gap-2 h-full w-full ' onSubmit={handlleSubmit}>
				{isRegistering ? (
					<>
						<div className='flex flex-wrap flex-row items-center justify-around w-full gap-4 px-6 sm:px-24'>
							<input type="text" required name="username" id="username" className='bg-white/0 border-b-2 border-white text-white placeholder-white text:2xl sm:text-3xl w-full sm:w-fit ' placeholder='Username' />
							<input type="email" required name="email" id="email" className='bg-white/0 border-b-2 border-white text-white placeholder-white text:2xl sm:text-3xl w-full sm:w-fit ' placeholder='Email' />
						</div>

						<div className='flex flex-wrap flex-row items-center justify-around w-full gap-4 px-6 sm:px-24'>
							<input type="password" required name="password" id="password" className='bg-white/0 border-b-2 border-white text-white placeholder-white text:2xl sm:text-3xl w-full sm:w-fit ' placeholder='Password' />
							<input type="password" required name="password-confirm" id="password-confirm" className='bg-white/0 border-b-2 border-white text-white placeholder-white text:2xl sm:text-3xl w-full sm:w-fit ' placeholder='Confirm Passwor' />
						</div>
					</>
				) : (
					<>
						<div className='flex flex-wrap flex-row items-center justify-around w-full gap-4 px-6 sm:px-24'>
							<input type="text" required name="username" id="username" className='bg-white/0 border-b-2 border-white text-white placeholder-white text:2xl sm:text-3xl w-full sm:w-fit ' placeholder='Username' />
							<input type="password" required name="password" id="password" className='bg-white/0 border-b-2 border-white text-white placeholder-white text:2xl sm:text-3xl w-full sm:w-fit ' placeholder='Password' />
						</div>
					</>
				)}
				<button type="submit" className='bg-yellow-300 px-4 py-4 my-2 rounded-full text-3xl w-full sm:w-[300px]'>{isRegistering ? 'Register' : 'Login'}</button>
			</form>

			<div className='w-full my-2 flex flex-col items-center justify-center'>
				<p className='text-4xl text-white'>
					{isRegistering ? 'Already have an account?' : 'New to the challenge?'} <span className='text-yellow-300 cursor-pointer' onClick={() => setIsRegistering(!isRegistering)}>{isRegistering ? 'Login' : 'Register'}</span>
				</p>
			</div>


		</div>
	)
}

export default AuthForm
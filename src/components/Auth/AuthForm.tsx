import React from 'react'

type Props = {
	isRegistering: boolean;
	setIsRegistering: (state: boolean) => void;
	handleSubmit: (formData: HTMLFormElement) => void;
}
const AuthForm = ({ isRegistering, setIsRegistering, handlleSubmit }: Props) => {
	return (
		<>
			{isRegistering ? (<></>) : (
				// Login
				<form className='flex flex-col items-center justify-between gap-2 h-full w-full pb-24'>
					<div className='flex flex-row items-center justify-around w-full px-24'>
						<input type="text" name="username" id="username" className='bg-white/0 border-b-2 border-white text-white placeholder-white text-3xl' placeholder='Username' />
						<input type="password" name="password" id="password" className='bg-white/0 border-b-2 border-white text-white placeholder-white text-3xl' placeholder='Password' />
					</div>
					<button type="submit">Login</button>

				</form>

			)}
		</>
	)
}

export default AuthForm
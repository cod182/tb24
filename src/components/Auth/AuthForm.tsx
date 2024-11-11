import React, { useState } from 'react';
import { createNewUser, login } from '../../lib/appwrite.js';

import { BiErrorCircle } from 'react-icons/bi';
import { GiSandsOfTime } from 'react-icons/gi';
import Loader from '../Loader.js';
import { getCurrentUser } from '../../lib/appwrite.js';
import { resizeImage } from '../../utils/functions.js';
import { useGlobalContext } from '../../context/userAuthContext';
import { useNavigate } from 'react-router-dom';

type Props = {
	isRegistering: boolean;
	setIsRegistering: (state: boolean) => void;
};

const AuthForm = ({ isRegistering, setIsRegistering }: Props) => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState<string>('');
	const [image, setImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const { setUser, setIsLoggedIn } = useGlobalContext();

	// Helper function to set error and clear after timeout
	const setErrorWithTimeout = (message: string) => {
		setError(message);
		setTimeout(() => setError(''), 1500);
	};

	const handleOnLogin = async (username: string, password: string) => {
		setLoading(true);
		setError('');
		try {
			const loginResponse = await login(username, password);
			if (loginResponse.userId) {
				const result = await getCurrentUser();
				if (result.$id) {
					setUser(result);
					setIsLoggedIn(true);
					navigate('/dashboard');
				}
			}
		} catch (err: unknown) {
			if (err instanceof Error) {
				setErrorWithTimeout(err.message);
			}
		} finally {
			setLoading(false);
		}
	};

	const checkPasswordsMatch = (): boolean => {
		if (password !== confirmPassword) {
			setErrorWithTimeout('Passwords do not match');
			return false;
		}
		setError('');
		return true;
	};

	const checkPasswordLength = () => password.length >= 8;

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!username || !email || !image || !password) {
			const missingFields: string[] = [];
			if (!username) missingFields.push('Username');
			if (!email) missingFields.push('Email');
			if (!image) missingFields.push('Image');
			if (!password) missingFields.push('Password');
			setErrorWithTimeout(`${missingFields.join(', ')} is required.`);
			return;
		}

		if (!checkPasswordLength()) {
			setErrorWithTimeout('Password must be at least 8 characters long');
			return;
		}

		if (!checkPasswordsMatch()) {
			return;
		}

		try {
			setLoading(true);
			const result = await createNewUser(email, password, username, image);
			if (result) {
				setUser(result);
				setIsLoggedIn(true);
				navigate('/dashboard');
			}
		} catch (err: unknown) {
			if (err instanceof Error) {
				setErrorWithTimeout(err.message);
			}
		} finally {
			setLoading(false);
		}
	};

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file && file.type.startsWith('image/')) {

			const reader = new FileReader();
			const resizedFile = await resizeImage(file, 280, 280);

			reader.onloadend = () => {
				if (reader.result) {
					setImagePreview(reader.result as string);
					setImage(resizedFile);
				}
			};
			reader.readAsDataURL(resizedFile);

		} else {
			setErrorWithTimeout('Please upload a valid image');
		}
	};

	const handleRemoveImage = () => {
		setImage(null);
		setImagePreview(null);
	};

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		if (!username || !password) {
			const missingFields: string[] = [];
			if (!username) missingFields.push('Username');
			if (!password) missingFields.push('Password');
			setErrorWithTimeout(`${missingFields.join(', ')} is required.`);
			return;
		}

		if (!checkPasswordLength()) {
			setErrorWithTimeout('Password must be at least 8 characters long');
			return;
		}

		handleOnLogin(username, password);
	};

	return (
		<div className='flex flex-col w-full h-full'>
			<form className='flex flex-col items-center justify-around w-full h-full sm:justify-between' onSubmit={isRegistering ? handleRegister : handleLogin}>
				{isRegistering ? (
					<>
						<div className='flex flex-row flex-wrap items-center justify-around w-full gap-4 px-6 sm:px-24'>
							<input type="text" name="username" id="username" className='min-h-[50px] bg-white/0 border-b-2 border-white text-white placeholder-white text:3xl placeholder-font-3xl sm:text-3xl w-full sm:w-fit' placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
							<input type="email" name="email" id="email" className='min-h-[50px] bg-white/0 border-b-2 border-white text-white placeholder-white text:3xl placeholder-font-3xl sm:text-3xl w-full sm:w-fit' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
						</div>

						<div className='flex flex-row flex-wrap items-center justify-around w-full gap-4 px-6 sm:px-24'>
							<input type="password" name="password" id="password" className='min-h-[50px] bg-white/0 border-b-2 border-white text-white placeholder-white text:3xl placeholder-font-3xl sm:text-3xl w-full sm:w-fit' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
							<input type="password" name="password-confirm" id="password-confirm" className='min-h-[50px] bg-white/0 border-b-2 border-white text-white placeholder-white text:3xl placeholder-font-3xl sm:text-3xl w-full sm:w-fit' placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} />
						</div>

						{/* Image upload */}
						<div className='relative flex flex-row flex-wrap items-center justify-around w-full gap-4 px-6 sm:px-24'>
							<label htmlFor="image" className="mt-4 w-[280px] h-[280px] overflow-hidden flex flex-col items-center justify-center">
								<input
									type="file"
									id="image"
									accept="image/*"
									onChange={handleImageChange}
									className="hidden"
								/>
								<div className="relative w-[280px] h-[280px] overflow-hidden border-2 flex flex-col items-center justify-center border-yellow-300 transition-all duration-200 ease bg-gray-400/70 text-center rounded-lg cursor-pointer hover:bg-gray-400/90 group">
									{imagePreview ? (
										<img
											src={imagePreview}
											alt="Image preview"
											className="absolute top-0 left-0 object-contain w-[280px] h-[280px] rounded-lg cursor-pointer"
											onClick={handleRemoveImage}
										/>
									) : (
										<span className='font-semibold text-white'>Add Picture</span>
									)}
								</div>
							</label>
						</div>
					</>
				) : (
					<>
						<div className='flex flex-row flex-wrap items-center justify-around w-full gap-4 px-6 sm:px-24'>
							<input type="text" name="username" id="username" className='min-h-[50px] bg-white/0 border-b-2 border-white text-white placeholder-white text:3xl placeholder-font-3xl sm:text-3xl w-full sm:w-fit ' placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
							<input type="password" name="password" id="password" className='min-h-[50px] bg-white/0 border-b-2 border-white text-white placeholder-white text:3xl placeholder-font-3xl sm:text-3xl w-full sm:w-fit ' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
						</div>
					</>
				)}
				<div className='flex flex-col items-center justify-center w-full gap-2 h-fit'>

					<div className='w-full h-fit min-h-[104px]'>
						<span className='text-red-500'>

							{error && (<Loader title={error} icon={BiErrorCircle} />)}
						</span>
						<span>
							{loading && (<Loader title={isRegistering ? 'Registering...' : 'Logging in...'} icon={GiSandsOfTime} />)}
						</span>
					</div>

					<button disabled={loading || error != ''} type="submit" className={` px-4 py-4 my-2 rounded-full text-3xl w-full sm:w-[300px] transition-all duration-200 ease  ${loading || error != '' ? 'bg-gray-300/90 select-none' : 'bg-yellow-300/90 hover:bg-yellow-300'}`}>{isRegistering ? 'Register' : 'Login'}</button>

				</div>

			</form>

			<div className='flex flex-col items-center justify-center w-full'>
				<p className='text-xl text-center text-white sm:text-4xl'>
					{isRegistering ? 'Already have an account?' : 'New to the challenge?'} <span className='transition-all duration-200 cursor-pointer text-yellow-300/90 ease hover:text-yellow-300' onClick={() => setIsRegistering(!isRegistering)}>{isRegistering ? 'Login' : 'Register'}</span>
				</p>
			</div>


		</div>
	)
}

export default AuthForm
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { createNewUser, login } from '../../lib/appwrite.js';

import { getCurrentUser } from '../../lib/appwrite.js';
import { useGlobalContext } from '../../context/userAuthContext';
import { useNavigate } from 'react-router-dom';

type Props = {
	isRegistering: boolean;
	setIsRegistering: (state: boolean) => void;
}
const AuthForm = ({ isRegistering, setIsRegistering }: Props) => {
	// STATES
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

	// Functions

	const handleOnLogin = async (email: string, password: string) => {
		setLoading(true);
		setError('');
		try {
			await login(email, password);
			const result = await getCurrentUser();

			if (result) {
				setUser(result);
				setIsLoggedIn(true)
				navigate('/dashboard');
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.message);
			setTimeout(() => {
				setError('');
			}, 1500)
		} finally {
			setLoading(false);
		}
	}


	// Function to check if passwords match
	const checkPasswordsMatch = (): boolean => {
		if (password !== confirmPassword) {
			setError('Passwords do not match');
			setTimeout(() => {
				setError('');
			}, 1500)
			return false;
		}
		setError('');
		return true;
	};

	const checkPasswordLength = () => {
		if (password.length >= 8) {
			return true
		} else {
			return false
		}
	}


	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		// Check if username, email, and image are provided
		if (!username || !email || !image || !password) {
			const missingField: string[] = [];
			if (!username) missingField.push('Username');
			if (!email) missingField.push('Email');
			if (!image) missingField.push('Image');
			if (!password) missingField.push('Password');
			// Set the error to inform the user which field is missing
			setError(`${missingField.join(', ')} is required.`);
			setLoading(false);

			setTimeout(() => {
				setError('');
			}, 1500);

			return false;
		}

		if (!checkPasswordLength()) {
			setError('Password must be at least 8 characters long');
			setTimeout(() => {
				setError('');
			}, 1500);
			return false

		}

		if (!checkPasswordsMatch()) {
			return;
		}

		try {
			const result = createNewUser(email, password, username, image)

			setUser(result);
			if (result) {
				setIsLoggedIn(true)
				navigate('/dashboard');
			}

		} catch (error: any) {
			setError(error.message)
			setTimeout(() => {
				setError('');
			}, 1500);
		} finally {
			setLoading(false);
			setError('');
		}
	};



	// Handle file input change
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// Check if the file is an image
			if (file.type.startsWith('image/')) {
				setImage(file);
				const reader = new FileReader();
				reader.onloadend = () => {
					if (reader.result) {
						setImagePreview(reader.result as string);
					}
				};
				reader.readAsDataURL(file);
			} else {
				setError('Please upload a valid image');
			}
		}
	};

	// Reset image on clicking the preview
	const handleRemoveImage = () => {
		setImage(null);
		setImagePreview(null);
	};

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();

		// Check if username, email, and image are provided
		if (!email || !password) {
			const missingField: string[] = [];
			if (!email) missingField.push('Email');
			if (!password) missingField.push('Password');

			// Set the error to inform the user which field is missing
			setError(`${missingField.join(', ')} is required.`);

			// Set the error to inform the user which field is missing
			setError(`${missingField.join(', ')} is required.`);

			setTimeout(() => {
				setError('');
			}, 1500);

			return false;
		}

		if (!checkPasswordLength()) {
			setError('Password must be at least 8 characters long');
			setTimeout(() => {
				setError('');
			}, 1500);
			return false
		}

		handleOnLogin(email, password)


	};

	return (
		<div className='w-full h-full flex flex-col '>
			<form className='flex flex-col items-center justify-around sm:justify-between h-full w-full' onSubmit={isRegistering ? handleRegister : handleLogin}>
				{isRegistering ? (
					<>
						<div className='flex flex-wrap flex-row items-center justify-around w-full gap-4 px-6 sm:px-24'>
							<input type="text" name="username" id="username" className='min-h-[50px] bg-white/0 border-b-2 border-white text-white placeholder-white text:3xl placeholder-font-3xl sm:text-3xl w-full sm:w-fit ' placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
							<input type="email" name="email" id="email" className='min-h-[50px] bg-white/0 border-b-2 border-white text-white placeholder-white text:3xl placeholder-font-3xl sm:text-3xl w-full sm:w-fit ' placeholder='Email' onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div className='flex flex-wrap flex-row items-center justify-around w-full gap-4 px-6 sm:px-24'>
							<input type="password" name="password" id="password" className='min-h-[50px] bg-white/0 border-b-2 border-white text-white placeholder-white text:3xl placeholder-font-3xl sm:text-3xl w-full sm:w-fit ' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
							<input type="password" name="password-confirm" id="password-confirm" className='min-h-[50px] bg-white/0 border-b-2 border-white text-white placeholder-white text:3xl placeholder-font-3xl sm:text-3xl w-full sm:w-fit ' placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} />
						</div>

						{/* Image upload */}
						<div className='flex flex-wrap flex-row items-center justify-around w-full gap-4 px-6 sm:px-24 relative'>
							<label htmlFor="image" className="mt-4 h-[200px] w-full sm:max-w-[300px] sm:min-w-[300px] flex flex-col items-center justify-center">
								<input
									type="file"
									id="image"
									accept="image/*"
									onChange={handleImageChange}
									className="hidden"

								/>
								{/* Custom Styled Button */}
								<div className="relative w-full sm:min-w-[300px] h-[200px] p-4 border-2 flex flex-col items-center justify-center border-yellow-300 transition-all duration-200 ease bg-gray-400/70 text-center  rounded-lg cursor-pointer hover:bg-gray-400/90 group">
									{imagePreview ? (
										// If an image is uploaded, show it as a preview over the button
										<img
											src={imagePreview}
											alt="Image preview"
											className="absolute top-0 left-0 w-full h-full object-contain rounded-lg cursor-pointer"
											onClick={handleRemoveImage}
										/>
									) : (
										// If no image, show "Add Image" text
										<span className='text-white font-semibold'>Add Picture</span>
									)}
								</div>
							</label>
						</div>
					</>
				) : (
					<>
						<div className='flex flex-wrap flex-row items-center justify-around w-full gap-4 px-6 sm:px-24'>
							<input type="email" name="email" id="email" className='min-h-[50px] bg-white/0 border-b-2 border-white text-white placeholder-white text:3xl placeholder-font-3xl sm:text-3xl w-full sm:w-fit ' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
							<input type="password" name="password" id="password" className='min-h-[50px] bg-white/0 border-b-2 border-white text-white placeholder-white text:3xl placeholder-font-3xl sm:text-3xl w-full sm:w-fit ' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
						</div>
					</>
				)}
				<div className='flex flex-col items-center justify-center gap-2 w-full h-fit'>

					<div className='w-full h-fit min-h-[20px]'>
						<p className="text-center text-red-500 font-xl font-bold">{error}{loading && 'Loading...'}</p>
					</div>
					<button type="submit" className='bg-yellow-300/90 px-4 py-4 my-2 rounded-full text-3xl w-full sm:w-[300px] transition-all duration-200 ease hover:bg-yellow-300'>{isRegistering ? 'Register' : 'Login'}</button>

				</div>

			</form>

			<div className='w-full flex flex-col items-center justify-center'>
				<p className='text-xl sm:text-4xl text-center text-white'>
					{isRegistering ? 'Already have an account?' : 'New to the challenge?'} <span className='text-yellow-300/90 cursor-pointer transition-all duration-200 ease hover:text-yellow-300' onClick={() => setIsRegistering(!isRegistering)}>{isRegistering ? 'Login' : 'Register'}</span>
				</p>
			</div>


		</div>
	)
}

export default AuthForm
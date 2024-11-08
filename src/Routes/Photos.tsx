import { AddImagePopUp, Loader } from '../components';
import { BiError, BiPhotoAlbum } from 'react-icons/bi';
import React, { useEffect, useState } from 'react'

import bgImage from '../assets/media/images/dash-bg.webp';
import { getUserPhotos } from "../lib/appwrite";
import { useGlobalContext } from '../context/userAuthContext';

const Photos = () => {
	const { user } = useGlobalContext();

	// STATES
	const [photos, setPhotos] = useState<{ imageUrl: string }[]>()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string>();

	// USE EFFECTS
	useEffect(() => {
		const getPhotos = async () => {
			setLoading(true);
			try {
				if (user) {
					const response = await getUserPhotos(user.$id);
					const data = await response;
					setPhotos(data);
					setLoading(false);
				} else {
					console.error('User is not logged in');
				}
			} catch (error) {
				setError('Error Fetching Photos');
				setLoading(false);
				console.error('Failed to fetch photos:', error);
			}
		}

		getPhotos();
	}, [user]);

	return (
		<div className='w-full min-h-[100dvh] relative p-4 sm:p-24'>
			{/* background */}
			<img src={bgImage} alt="background" className='absolute top-0 left-0 select-none h-full w-full z-[-1] blur-sm object-cover' />
			{error ?
				(
					<Loader title='Error!' subText={error} icon={BiError} />
				)
				: loading ? (
					<Loader title='Loading Photos' subText='Please wait...' icon={BiPhotoAlbum} />
				) : photos && photos.length > 0 ? (
					<div className="grid grid-cols-2 grid-rows-2 gap-x-6 w-fit items-center h-[229px] mx-auto">
						{photos.map((photo, index) => (
							<div key={index} className="relative overflow-hidden h-[90px] max-w-full  rounded-lg border-black border-2 bg-gray-300/80">
								<img
									src={photo.imageUrl}
									alt={`Photo ${index + 1}`}
									className="h-full w-full object-cover"
								/>
							</div>
						))}
						{photos.length < 4 && Array.from({ length: 4 - photos.length }).map((_, index) => (
							<div key={index} className="relative overflow-hidden h-[90px] w-full rounded-lg border-black border-2 bg-gray-300/80" />
						))}
					</div>
				) : (
					<AddImagePopUp userId={user ? user.$id : ''} />
				)
			}

		</div>
	)
}

export default Photos
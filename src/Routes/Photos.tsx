import { AddImagePopUp, Loader, Photo } from '../components';
import { BiArrowBack, BiError, BiPhotoAlbum } from 'react-icons/bi';
import React, { useEffect, useState } from 'react'

import { Navigate } from 'react-router-dom';
// import { PhotoProps } from '../../types/custom';
import bgImage from '../assets/media/images/dash-bg.webp';
// import { getUserPhotos } from "../lib/appwrite";
import { useGlobalContext } from '../context/userAuthContext';
import { usePhotoContext } from '../context/usePhotoContext';

const Photos = () => {
	const { user } = useGlobalContext();
	const { photos, setPhotos, getPhotos, loading } = usePhotoContext();

	// STATES
	// const [photos, setPhotos] = useState<PhotoProps[]>()
	// const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string>();

	// USE EFFECTS
	useEffect(() => {


		getPhotos();
	}, [user]);

	// FUNCTIONS

	// const getPhotos = async () => {
	// 	setLoading(true);
	// 	try {
	// 		if (user) {
	// 			const response = await getUserPhotos(user.$id);
	// 			const data = await response;
	// 			setPhotos(data);
	// 			setLoading(false);
	// 		} else {
	// 			console.error('User is not logged in');
	// 		}
	// 	} catch (error) {
	// 		setError('Error Fetching Photos');
	// 		setLoading(false);
	// 		console.error('Failed to fetch photos:', error);
	// 	}
	// }



	if (!user) return <Navigate to="/" replace />

	return (
		<div className='w-full min-h-[100dvh] relative p-4 md:p-24'>
			{/* background */}
			<img src={bgImage} alt="background" className='absolute top-0 left-0 select-none h-full w-full z-[-1] blur-sm object-cover' />

			<div className='w-full'>
				<a href="/dashboard" className='group z-[1] px-4 py-2 bg-yellow-300/80 text-black hover:bg-yellow-300/90 rounded-lg flex flex-row items-center justify-center gap-2 w-fit transition-all duration-200 ease'> <BiArrowBack className='inline group-hover:translate-x-[-5px] group-hover:font-bold transition-all duration-200 ease' /> Back</a>
			</div>

			<div className='w-full h-full grow flex flex-row flex-wrap  items-center justify-center md:justify-start p-4 gap-4'>
				{error ? (
					<Loader title='Error!' subText={error} icon={BiError} />
				) : loading ? (
					<div className='w-full h-full flex flex-col items-center justify-center'>
						<Loader title='Loading Your Photos' subText='Please wait...' icon={BiPhotoAlbum} />
					</div>
				) : photos && photos.length > 0 ? (

					<>

						{photos.map((photo) => (
							<div key={photo.$id} className='max-h-[280px] max-w-[280px]'>

								<Photo photo={photo} />
							</div>
						))}


						<div className='h-[280px] w-[280px] flex flex-col items-start justify-center border-2 rounded-lg border-yellow-300'>
							<AddImagePopUp userId={user.$id} />
						</div>
					</>
				) : (

					<div className='h-[280px] max-w-[280px] w-[280px] flex flex-col items-start justify-center border-2 rounded-lg border-yellow-300'>
						<AddImagePopUp userId={user.$id} />
					</div>

				)}
			</div>
		</div>
	)
}

export default Photos
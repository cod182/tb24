import { AddImagePopUp, Loader, PageTitleWithNav, Photo } from '../components';
import { BiError, BiPhotoAlbum } from 'react-icons/bi';

import { Navigate } from 'react-router-dom';
// import { PhotoProps } from '../../types/custom';
import bgImage from '../assets/media/images/dash-bg.webp';
import { useEffect } from 'react'
// import { getUserPhotos } from "../lib/appwrite";
import { useGlobalContext } from '../context/userAuthContext';
import { usePhotoContext } from '../context/usePhotoContext';

const Photos = () => {
	const { user } = useGlobalContext();
	const { photos, getPhotos, loading, error } = usePhotoContext();



	// USE EFFECTS
	useEffect(() => {
		getPhotos();
	}, []);





	if (!user) return <Navigate to="/" replace />

	return (
		<div className='w-full min-h-[100dvh] relative p-4 md:p-24'>
			{/* background */}
			<img src={bgImage} alt="background" className='absolute top-0 left-0 select-none h-full w-full z-[-1] blur-sm object-cover' />


			<PageTitleWithNav title='Photos' navLink='/dashboard' titleStyles='text-5xl text-white capitalize md:text-7xl text-center' />



			<div className='flex flex-row flex-wrap items-center justify-center w-full h-full gap-4 p-4 grow md:justify-start'>
				{error ? (
					<Loader title='Error!' subText={error} icon={BiError} />
				) : loading ? (
					<div className='flex flex-col items-center justify-center w-full h-full'>
						<Loader title='Loading Your Photos' subText='Please wait...' icon={BiPhotoAlbum} />
					</div>
				) : photos && photos.length > 0 ? (

					<div className="grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:gap-12">

						<div className="w-full max-w-[280px] mx-auto h-auto flex flex-col items-start justify-center border-2 rounded-lg border-yellow-300 overflow-hidden bg-blue-950/80">
							<div className="flex items-center justify-center w-full aspect-square text-white-children">
								<AddImagePopUp userId={user?.$id} />
							</div>
						</div>

						{photos.map((photo) => (
							<div key={photo.$id} className="w-full max-w-[280px] mx-auto overflow-hidden rounded-lg border border-gray-300">
								<div className="aspect-square">
									<Photo photo={photo} />
								</div>
							</div>
						))}

					</div>
				) : (

					<div className="w-full max-w-[280px] mx-auto h-auto flex flex-col items-start justify-center border-2 rounded-lg border-yellow-300 overflow-hidden bg-blue-950/80 t">
						<div className="flex items-center justify-center w-full aspect-square text-white-children">
							<AddImagePopUp userId={user?.$id} />
						</div>
					</div>

				)}
			</div>
		</div>
	)
}

export default Photos
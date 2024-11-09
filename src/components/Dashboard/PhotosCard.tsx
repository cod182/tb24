import { BiError, BiPhotoAlbum } from "react-icons/bi";

import { AddImagePopUp } from '../index';
import DashboardCard from './DashboardCard'
import Loader from "../Loader";
import { useEffect } from "react";
import { useGlobalContext } from '../../context/userAuthContext';
import { usePhotoContext } from '../../context/usePhotoContext';

const PhotosCard = () => {
	const { user } = useGlobalContext();
	const { photos, getPhotos, loading, error } = usePhotoContext();



	// USE EFFECTS
	useEffect(() => {
		getPhotos();
	}, [user]);

	return (
		<DashboardCard title='Photos' link={photos && photos.length > 0 ? '/photos' : undefined}>
			<div className='w-full h-full '>
				{error ?
					(
						<Loader title='Error!' subText={error} icon={BiError} />
					)
					: loading ? (
						<Loader title='Loading Photos' subText='Please wait...' icon={BiPhotoAlbum} />
					) : photos && photos.length > 0 ? (
						<div className="grid grid-cols-2 grid-rows-2 gap-x-6 w-fit items-center h-[229px] mx-auto">
							{photos.slice(0, 4).map((photo, index) => (
								<div key={index} className="relative overflow-hidden h-[90px] max-w-full  rounded-lg border-black border-2 bg-gray-300/80">
									<img
										src={photo.imageUrl}
										alt={`Photo ${index + 1}`}
										className="object-cover w-full h-full"
									/>
								</div>
							))}
							{photos.length < 4 && Array.from({ length: 4 - photos.length }).map((_, index) => (
								<div key={index} className="relative overflow-hidden h-[90px] w-full rounded-lg border-black border-2 bg-gray-300/80" />
							))}
						</div>
					) : (
						<div className="h-[200px]">
							<AddImagePopUp userId={user ? user.$id : ''} />
						</div>
					)
				}

			</div>
		</DashboardCard>
	)
}

export default PhotosCard
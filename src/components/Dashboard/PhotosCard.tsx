import { BiError, BiPhotoAlbum } from "react-icons/bi";
import { useEffect, useState } from "react";

import DashboardCard from './DashboardCard'
import { FcAddImage } from "react-icons/fc";
import Loader from "../Loader";
import { getUserPhotos } from "../../lib/appwrite";
import { useGlobalContext } from '../../context/userAuthContext';

type PhotosItem = {
	imageUrl: string
}

const PhotosCard = () => {
	const { user } = useGlobalContext();


	const [photos, setPhotos] = useState<PhotosItem[]>()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string>();


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
		<DashboardCard title='Photos' link='photos'>
			<div className='w-full h-full group '>
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
						<div className="flex flex-col items-center justify-center gap-2 h-full w-full">
							<p className="text-3xl group-hover:text-yellow-300 transition-all duration-200 ease">Add Photos</p>
							<FcAddImage className="w-16 h-16 group-hover:rotate-[10deg] transition-all duration-200 ease" />
						</div>
					)
				}

			</div>
		</DashboardCard>
	)
}

export default PhotosCard
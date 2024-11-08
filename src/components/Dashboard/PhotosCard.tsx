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
			<div className='flex flex-col items-center justify-center gap-2 w-full h-full group'>
				{error ?
					(
						<Loader title='Error!' subText={error} icon={BiError} />
					)
					: loading ? (
						<Loader title='Loading Photos' subText='Please wait...' icon={BiPhotoAlbum} />
					) : photos.length > 0 ? (
						<div></div>
					) : (
						<div className="flex flex-col items-center justify-center gap-2">
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
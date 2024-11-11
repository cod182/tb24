import { BiError, BiTrash } from 'react-icons/bi';

import { IoClose } from 'react-icons/io5';
import Loader from '../Loader';
import { TiTick } from 'react-icons/ti';
import { deleteImage } from '../../lib/appwrite';
import { usePhotoContext } from '../../context/usePhotoContext';
import { useState } from 'react';

type Props = {
	photo: {
		$id: string;
		ownerId: string;
		imageUrl: string;
		imageId: string;
	};
}

const Photo = ({ photo }: Props) => {
	const { photos, setPhotos } = usePhotoContext();
	const [checkDelete, setCheckDelete] = useState(false);
	const [error, setError] = useState<string>();

	// Functions
	const handleDeleteImage = async () => {
		if (checkDelete) {
			try {
				// Calls the function to delete from appwrite storage and collection
				await deleteImage(photo.imageId, photo.$id);
				if (photos) {
					// Saving from making another API call, just updating the local state when deleting from db
					const newPhotoArray = photos.filter(
						(img) => img.imageId != photo.imageId
					);
					setPhotos(newPhotoArray);
				}
			} catch (error) {
				setError('Error Deleting Photo');
				console.error('Failed to delete photo:', error);
				setTimeout(() => {
					setError('');
				}, 2000);
			}
			setCheckDelete(false);
		} else {
			setCheckDelete(true);
		}
	};

	return (
		<section className="relative object-cover w-full h-full overflow-hidden border-2 border-yellow-300 rounded-lg bg-blue-950/80 group">
			{/* Delete Image */}
			<div className={`transition-all duration-200 opacity-0 group-hover:opacity-100 ease select-none absolute w-full h-full top flex-col items-center justify-center flex bg-gray-400/70`}>
				{error ? (
					<Loader title='Error!' subText={error} icon={BiError} />
				) : checkDelete ? (
					<div
						className="flex flex-col justify-center w-full h-full item-center"
						onMouseLeave={() => setCheckDelete(false)}
					>
						<p className="w-full text-3xl text-center">Are you sure?</p>

						<div className="flex flex-row items-center justify-around w-full">
							<IoClose
								className="w-[40px] h-[40px] text-red-400 hover:scale-110 hover:text-red-300 cursor-pointer hover:animate-pulse transition-all duration-200 ease"
								onClick={() => setCheckDelete(false)}
								aria-label="Cancel delete"
							/>
							<TiTick
								className="w-[40px] h-[40px] text-green-400 hover:scale-110 hover:text-green-300 cursor-pointer hover:animate-pulse transition-all duration-200 ease"
								onClick={() => handleDeleteImage()}
								aria-label="Confirm delete"
							/>
						</div>
					</div>
				) : (
					<BiTrash
						className="w-10 h-10 text-red-500 transition-all duration-200 cursor-pointer hover:text-red-600 hover:scale-105 hover:animate-pulse ease"
						onClick={handleDeleteImage}
						aria-label="Delete photo"
					/>
				)}
			</div>

			{/* Image */}
			<img
				src={photo.imageUrl}
				alt={`Photo ${photo.$id + 1}`}
				className="object-cover w-full h-full"
				aria-label={`Image of ${photo.$id}`}
			/>
		</section>
	);
}

export default Photo;

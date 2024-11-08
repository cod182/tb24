import { BiError, BiTrash } from 'react-icons/bi';

import { IoClose } from 'react-icons/io5';
import Loader from '../Loader';
import { TiTick } from 'react-icons/ti';
import { deleteImage } from '../../lib/appwrite'
import { usePhotoContext } from '../../context/usePhotoContext';
import { useState } from 'react'

type Props = {
	photo: {
		$id: string;
		ownerId: string;
		imageUrl: string;
		imageId: string
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
				// Calls the fucntion to delete from appwrite storage and collection
				const response = await deleteImage(photo.imageId, photo.$id);
				console.log(response)
				// getPhotos();
				if (photos) {
					// Saving from making another API call, just updating the locall state when deleting from db
					const newPhotoArray = photos.filter(
						(img) => img.imageId != photo.imageId
					)
					setPhotos(newPhotoArray);
				}
			} catch (error) {

				setError('Error Deleting Photo');
				console.error('Failed to delete photo:', error);

				setTimeout(() => {
					setError('');
				}, 4000)

			}
			setCheckDelete(false);

		} else {
			setCheckDelete(true);
		}

	}


	return (
		<div className="relative group overflow-hidden h-full w-full rounded-lg border-black border-2 bg-gray-300/80">

			{/* Delete Image */}
			<div className={`transition-all duration-200 opacity-0 group-hover:opacity-100  ease  select-none absolute w-full h-full top flex-col items-center justify-center flex bg-gray-400/70`}
			>
				{error ? <Loader title='Error!' subText={error} icon={BiError} /> : checkDelete ?
					(
						<div className='flex flex-col item-center justify-center' onMouseLeave={() => setCheckDelete(false)}>
							<p>Are you sure?</p>

							<div className='w-full h-full flex flex-row items-center justify-around'>
								<IoClose className='w-[30px] h-[30px] text-red-400 hover:scale-110 hover:text-red-300 cursor-pointer' onClick={() => setCheckDelete(false)} />
								<TiTick className='w-[30px] h-[30px] text-green-400 hover:scale-110 hover:text-green-300 cursor-pointer' onClick={() => {
									handleDeleteImage();
								}} />
							</div>
						</div>
					) :
					(
						<BiTrash className="cursor-pointer text-red-500 hover:text-red-500 w-10 h-10" onClick={handleDeleteImage} />
					)}
			</div>

			{/* Image */}
			<img
				src={photo.imageUrl}
				alt={`Photo ${photo.$id + 1}`}
				className="h-full w-full object-cover"
			/>
		</div>
	)
}

export default Photo
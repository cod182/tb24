import AddImage from './AddImage';
import { BiError } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { FaUpload } from 'react-icons/fa';
import { FcAddImage } from 'react-icons/fc'
import Loader from '../Loader';
import { PhotoProps } from '../../../types/custom';
import { uploadUserImage } from '../../lib/appwrite'
import { usePhotoContext } from '../../context/usePhotoContext';
import { useState } from 'react';

const AddImagePopUp = ({ userId }: { userId: string }) => {
	const { photos, setPhotos } = usePhotoContext();

	// STATES
	const [popUpState, setPopUpState] = useState(false);
	const [image, setImage] = useState<File | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string>()
	// Functions
	const handleAddImage = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true)
		try {
			const response = await uploadUserImage(image, userId);
			if (response) {
				if (photos) {
					const currPhotos: PhotoProps[] = [];

					currPhotos.push(...photos)
					// Create a new photo object and attach its ID from the response
					const newPhoto = {
						$id: response.$id,
						ownerId: response.ownerId,
						imageUrl: response.imageUrl,
						imageId: response.imageId
					}
					// Pushes new task into array
					currPhotos.push(newPhoto);
					// Sets photos array in context to save on API calls
					setPhotos(currPhotos);
				}
				setLoading(false);
				setPopUpState(false);
				setImage(null);
				setError('');
			}
		} catch {
			setLoading(false);
			setError('Error Uploading Image');
		}
	}

	if (loading) return <Loader title='Uploading Image..' icon={FaUpload} />
	if (error) return <Loader title='Error!' subText={error} icon={BiError} />


	return (
		<div className="relative flex flex-col items-center justify-center w-full h-full gap-2">

			{/* PopUp Modal */}
			<div className={`${popUpState ? 'h-[100%] py-2 pt-9' : 'h-[0%] py-0 pt-0'} p-x-2 overflow-hidden flex w-full absolute top-0 bg-gray-200/80 rounded-lg transition-all duration-200 ease flex-col items-center justify-center z-[2]`} aria-live="assertive" role="dialog" aria-labelledby="addImagePopUpTitle">

				{/* Close Button */}
				<button
					className='absolute p-2 transition-all duration-200 rounded-full top-2 right-2 bg-yellow-300/70 hover:bg-yellow-400/90 hover:text-white ease'
					onClick={() => setPopUpState(false)}
					aria-label="Close Image Upload"
				>
					<CgClose />
				</button>

				<AddImage handleSubmit={handleAddImage} setImage={setImage} />

			</div>


			<div className='flex flex-col items-center justify-center w-full h-full gap-2 cursor-pointer group' onClick={() => setPopUpState(true)} aria-expanded={popUpState ? 'true' : 'false'}>
				<p className="text-3xl text-center transition-all duration-200 ease group-hover:text-yellow-300" id="addImagePopUpTitle">Add Photo</p>
				<FcAddImage
					className="w-16 h-16 group-hover:rotate-[10deg] transition-all duration-200 ease"
					aria-label="Add Image Icon"
				/>
			</div>
		</div>
	)
}

export default AddImagePopUp;

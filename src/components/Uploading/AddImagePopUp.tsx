import AddImage from './AddImage';
import { BiError } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { FaUpload } from 'react-icons/fa';
import { FcAddImage } from 'react-icons/fc'
import Loader from '../Loader';
import { uploadUserImage } from '../../lib/appwrite'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AddImagePopUp = ({ userId }: { userId: string }) => {
	const navigate = useNavigate();

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
			const response = await uploadUserImage(image, userId)
			console.log(response)
			if (response) {
				setLoading(false);
				setPopUpState(false);
				setImage(null);
				setError('');
				navigate('/photos');
			}
		} catch {
			setLoading(false);
			setError('Error Uploading Image');
		}
	}

	if (loading) return <Loader title='Uploading Image..' icon={FaUpload} />
	if (error) return <Loader title='Error!' subText={error} icon={BiError} />


	return (
		<div className="relative flex flex-col items-center justify-center gap-2 h-full w-full">

			{/* PopUp Modal */}
			<div className={`${popUpState ? 'h-[100%] py-2 pt-9' : 'h-[0%] py-0 pt-0'} p-x-2 overflow-hidden flex w-full absolute top-0 bg-gray-200/80 rounded-lg transition-all duration-200 ease flex-col items-center justify-center z-[2]`}>

				{/* Close Button */}
				<button className='absolute top-2 right-2 bg-yellow-300/70 hover:bg-yellow-400/90 hover:text-white p-2 rounded-full transition-all duration-200 ease' onClick={() => setPopUpState(!popUpState)}> <CgClose /></button>

				<AddImage handleSubmit={handleAddImage} setImage={setImage} />

			</div>
			<div className='group flex flex-col items-center justify-center gap-2 h-full w-full cursor-pointer' onClick={() => setPopUpState(true)}>
				<p className="text-3xl group-hover:text-yellow-300 transition-all duration-200 ease">Add Photos</p>
				<FcAddImage className="w-16 h-16 group-hover:rotate-[10deg] transition-all duration-200 ease" />
			</div>
		</div>
	)
}

export default AddImagePopUp
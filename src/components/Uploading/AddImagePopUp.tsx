import AddImage from './AddImage';
import { CgClose } from 'react-icons/cg';
import { FcAddImage } from 'react-icons/fc'
import { useState } from 'react';

const AddImagePopUp = ({ userId }: { userId: string }) => {

	// STATES
	const [popUpState, setPopUpState] = useState(false);

	// Functions
	const handleAddImage = async () => {
		setPopUpState(true)
	}
	return (
		<div className="relative flex flex-col items-center justify-center gap-2 h-full w-full">

			{/* PopUp Modal */}
			<div className={`${popUpState ? 'h-[100%] py-2' : 'h-[0%] py-0'} p-x-2 overflow-hidden flex w-full absolute top-0 bg-gray-200/80 rounded-lg transition-all duration-200 ease flex-col items-center justify-center z-[2]`}>

				{/* Close Button */}
				<button className='absolute top-2 right-2 bg-yellow-300/70 hover:bg-yellow-400/90 hover:text-white p-2 rounded-full transition-all duration-200 ease' onClick={() => setPopUpState(!popUpState)}> <CgClose /></button>

				<AddImage handleSubmit={() => { }} />

			</div>
			<div className='group flex flex-col items-center justify-center gap-2 h-full w-full cursor-pointer' onClick={handleAddImage}>
				<p className="text-3xl group-hover:text-yellow-300 transition-all duration-200 ease">Add Photos</p>
				<FcAddImage className="w-16 h-16 group-hover:rotate-[10deg] transition-all duration-200 ease" />
			</div>
		</div>
	)
}

export default AddImagePopUp
import { BiTrash } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { TiTick } from 'react-icons/ti';
import { useState } from 'react'

type Props = {
	photo: {
		$id: string;
		ownerId: string;
		imageUrl: string;
		imageId: string
	};
	deleteImage: (imageId: string, documentId: string) => void
}

const Photo = ({ photo, deleteImage }: Props) => {

	const [checkDelete, setCheckDelete] = useState(false);

	// Functions
	const handleDeleteImage = () => {

		if (checkDelete) {
			deleteImage(photo.imageId, photo.$id);
			setCheckDelete(false);

		} else {
			setCheckDelete(true);
		}

	}


	return (
		<div className="relative group overflow-hidden h-[90px] max-w-full  rounded-lg border-black border-2 bg-gray-300/80">

			{/* Delete Image */}
			<div className={`transition-all duration-200 opacity-0 group-hover:opacity-100  ease  select-none absolute w-full h-full top flex-col items-center justify-center flex bg-gray-400/50`}
			>
				{checkDelete ?
					(<div className='w-full h-full flex flex-row items-center justify-around'>
						<IoClose className='w-[30px] h-[30px] text-red-400 hover:scale-110 hover:text-red-300 cursor-pointer' onClick={() => setCheckDelete(false)} />
						<TiTick className='w-[30px] h-[30px] text-green-400 hover:scale-110 hover:text-green-300 cursor-pointer' onClick={() => {
							handleDeleteImage();
						}} />
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
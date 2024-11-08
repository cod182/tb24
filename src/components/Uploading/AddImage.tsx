import { FcAddImage } from "react-icons/fc";
import { resizeImage } from "../../utils/functions";
import { useState } from "react";

const AddImage = ({ handleSubmit, setImage }: { handleSubmit: (e: React.FormEvent) => void; setImage: React.Dispatch<React.SetStateAction<File | null>> }) => {

	const [imagePreview, setImagePreview] = useState<string | null>();
	const [error, setError] = useState<string>('');

	// Handle file input change
	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// Check if the file is an image
			if (file.type.startsWith('image/')) {
				const resizedFile = await resizeImage(file, 280, 280)

				const reader = new FileReader();
				reader.onloadend = () => {
					if (reader.result) {

						setImagePreview(reader.result as string);
						setImage(resizedFile);
					}
				};

				reader.readAsDataURL(resizedFile);
			} else {
				setError('Please upload a valid image');
			}
		}
	};

	const handleRemoveImage = () => {
		setImagePreview(null);
		setImage(null);
	};

	return (
		<div className="w-full h-full relative">
			<div className={`absolute flex flex-col items-center justify-center w-full top z-[3] transition-all duration-200 ease  ${error ? 'max-h-[300px] overflow-scroll' : 'max-h-[0px] overflow-hidden'}`}>
				<div className=" bg-red-500/90 w-fit rounded-full px-4 py-2">
					<p className="text-black font-xl">
						{error}
					</p>
				</div>
			</div>

			<form onSubmit={handleSubmit} className="w-full h-fit p-2">
				<div className='flex flex-wrap flex-col items-center justify-center w-full gap-2 relative h-full'>
					<label htmlFor="image" className="h-[100px] w-full flex flex-col items-center justify-center gap-2">
						<input
							type="file"
							id="image"
							accept="image/*"
							onChange={handleImageChange}
							className="hidden"

						/>
						{/* Custom Styled Button */}
						<div className={`aspect-square w-[100px] h-[100px] relative p-4 border-2 flex flex-col items-center justify-center border-yellow-300 transition-all duration-200 ease bg-gray-400/70 text-center  rounded-lg cursor-pointer hover:bg-gray-400/90 group`}>
							{imagePreview ? (
								// If an image is uploaded, show it as a preview over the button
								<img
									src={imagePreview}
									alt="Image preview"
									className="absolute top-0 left-0 w-full h-full object-contain rounded-lg cursor-pointer"
									onClick={handleRemoveImage}
								/>
							) : (
								// If no image, show "Add Image" text
								<>
									<FcAddImage className="w-16 h-16 group-hover:rotate-[10deg] transition-all duration-200 ease" />
								</>

							)}
						</div>
					</label>
					<button disabled={!imagePreview} className={`w-full h-fit py-2 px-4  text-black font-semibold rounded-lg ${imagePreview ? 'bg-yellow-300/70 hover:bg-yellow-400/90 text-black' : 'bg-gray-300 text-gray-500'}`}>Upload</button>
				</div>

			</form>
		</div>
	)
}

export default AddImage
import { FcAddImage } from "react-icons/fc";
import { resizeImage } from "../../utils/functions";
import { useState } from "react";

const AddImage = ({ handleSubmit, setImage }: { handleSubmit: (e: React.FormEvent) => void; setImage: React.Dispatch<React.SetStateAction<File | null>> }) => {
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [error, setError] = useState<string>('');

	// Handle changing the image
	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// Check if the file is an image
			if (file.type.startsWith('image/')) {
				const resizedFile = await resizeImage(file, 280, 280);

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
		<div className="relative w-full h-full">
			{/* Error  */}
			<div className={`absolute flex flex-col items-center justify-center w-full top z-[3] transition-all duration-200 ease ${error ? 'max-h-[300px] overflow-scroll' : 'max-h-[0px] overflow-hidden'}`} role="alert" aria-live="assertive">
				<div className="px-4 py-2 rounded-full bg-red-500/90 w-fit">
					<p className="text-black font-xl">
						{error}
					</p>
				</div>
			</div>

			{/* Add an image */}
			<form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full h-full gap-2 p-2 grow">
				<label htmlFor="image" className="h-[100px] w-full flex flex-col items-center justify-center gap-2">
					<input
						type="file"
						id="image"
						accept="image/*"
						onChange={handleImageChange}
						className="hidden"
						aria-label="Upload an image"
					/>

					<div
						className={`aspect-square w-[100px] h-[100px] relative p-4 border-2 flex flex-col items-center justify-center border-yellow-300 transition-all duration-200 ease bg-gray-400/70 text-center rounded-lg cursor-pointer hover:bg-gray-400/90 group`}
						aria-label="Click to add an image"
					>
						{imagePreview ? (
							// If an image is uploaded, show the image in a grid
							<img
								src={imagePreview}
								alt="Image preview"
								className="absolute top-0 left-0 object-contain w-full h-full rounded-lg cursor-pointer"
								onClick={handleRemoveImage}
								aria-label="Click to remove image preview"
							/>
						) : (
							// If no image, show Add Image icon
							<FcAddImage className="w-16 h-16 group-hover:rotate-[10deg] transition-all duration-200 ease" />
						)}
					</div>
				</label>

				{/* Upload Button */}
				<button
					disabled={!imagePreview}
					className={`w-full h-fit py-2 px-4 text-center text-black font-semibold rounded-lg z-[4] ${imagePreview ? 'bg-yellow-300/70 hover:bg-yellow-400/90 text-black' : 'bg-gray-300 text-gray-600'}`}
					aria-disabled={!imagePreview}
				>
					{imagePreview ? 'Upload Image' : 'Click To Add'}
				</button>
			</form>
		</div>
	);
};

export default AddImage;

import { useState } from "react";

const AddImage = ({ handleSubmit }: { handleSubmit: (e: React.FormEvent) => void }) => {

	const [imagePreview, setImagePreview] = useState<string | null>();
	const [error, setError] = useState<string>('');

	// Handle file input change
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// Check if the file is an image
			if (file.type.startsWith('image/')) {

				const reader = new FileReader();
				reader.onloadend = () => {
					if (reader.result) {
						setImagePreview(reader.result as string);
					}
				};
				reader.readAsDataURL(file);
			} else {
				setError('Please upload a valid image');
			}
		}
	};

	const handleRemoveImage = () => {
		setImagePreview(null);
	};

	return (
		<div className="w-full h-fit relative">
			<div className={`absolute flex flex-col items-center justify-center w-full top z-[3] transition-all duration-200 ease  ${error ? 'max-h-[300px] overflow-scroll' : 'max-h-[0px] overflow-hidden'}`}>
				<div className=" bg-red-500/90 w-fit rounded-full px-4 py-2">
					<p className="text-black font-xl">
						{error}
					</p>
				</div>
			</div>

			<form onSubmit={handleSubmit} className="w-full h-fit p-2">
				<div className='flex flex-wrap flex-row items-start justify-center w-full gap-2  relative h-full'>
					<label htmlFor="image" className="h-full max-h-[100px] w-full flex flex-col items-center justify-center gap-2">
						<input
							type="file"
							id="image"
							accept="image/*"
							onChange={handleImageChange}
							className="hidden"

						/>
						{/* Custom Styled Button */}
						<div className={`w-full relative h-full p-4 border-2 flex flex-col items-center justify-center border-yellow-300 transition-all duration-200 ease bg-gray-400/70 text-center  rounded-lg cursor-pointer hover:bg-gray-400/90 group`}>
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
								<span className='text-white font-semibold select-none'>Add Picture</span>
							)}
						</div>
					</label>
					<button className="w-full h-fit py-2 px-4 bg-yellow-300/70 hover:bg-yellow-400/90 text-black font-semibold rounded-lg">Upload</button>
				</div>

			</form>
		</div>
	)
}

export default AddImage
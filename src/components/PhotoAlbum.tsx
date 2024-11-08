import { BiTrash } from "react-icons/bi";

type Props = {
	photos: {
		$id: string;
		ownerId: string;
		imageUrl: string;
	}[];
	deleteImage: () => void
}

const PhotoAlbum = ({ photos, deleteImage }: Props) => {
	if (!photos) return

	return (

		<div>
			{photos.slice(0, 4).map((photo) => (
				<div key={photo.$id} className="relative group overflow-hidden h-[90px] max-w-full  rounded-lg border-black border-2 bg-gray-300/80">
					<div className="absolute w-full h-full top flex-col items-center justify-center group-hover:flex hidden bg-gray-400/50">
						<BiTrash className="text-red-500 hover:text-red-500 w-10 h-10" />
					</div>
					<img
						src={photo.imageUrl}
						alt={`Photo ${photo.$id + 1}`}
						className="h-full w-full object-cover"
					/>
				</div>
			))}
		</div>
	)




}

export default PhotoAlbum
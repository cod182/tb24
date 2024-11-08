import { Photo } from "..";

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

		<div className="">
			{photos.slice(0, 4).map((photo) => (
				<Photo key={photo.$id} photo={photo} deleteImage={deleteImage} />
			))}
		</div>
	)




}

export default PhotoAlbum
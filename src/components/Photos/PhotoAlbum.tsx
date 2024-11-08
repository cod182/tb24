import { Photo } from "..";
import { PhotoProps } from "../../../types/custom";
import { deleteImage } from '../../lib/appwrite'
import { useState } from "react";
type Props = {
	photos: PhotoProps[];

}

const PhotoAlbum = ({ photos }: Props) => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string>();

	if (!photos) return

	// FUNCTIONS

	const handleDeleteImage = async (id: string, documentId: string) => {
		setLoading(true);
		try {
			await deleteImage(id, documentId);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError('Error Deleting Photo');
			console.error('Failed to delete photo:', error);
		}
	}


	return (

		<div className="">
			{photos.slice(0, 4).map((photo) => (
				<Photo key={photo.$id} photo={photo} deleteImage={handleDeleteImage} />
			))}
		</div>
	)




}

export default PhotoAlbum
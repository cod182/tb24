import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { PhotoProps } from '../../types/custom';
import { getUserPhotos } from '../lib/appwrite';

type UserType = {
	$collectionId: string;
	$createdAt: string;
	$databaseId: string;
	$id: string;
	$updatedAt: string;
	accountId: string;
	email: string;
	image: string;
	username: string;
};

type GlobalContextType = {
	photos: PhotoProps[] | null;
	setPhotos: React.Dispatch<React.SetStateAction<PhotoProps[] | null>>;
	getPhotos: () => Promise<void>;
	loading: boolean;
};

const globalPhotoContext = createContext<GlobalContextType>({
	photos: null,
	setPhotos: () => { },
	getPhotos: async () => { },
	loading: false,
});

export const usePhotoContext = () => useContext(globalPhotoContext);

const PhotoContext = ({ children }: { children: ReactNode }) => {
	const [photos, setPhotos] = useState<PhotoProps[] | null>(null);
	const [loading, setLoading] = useState(false);

	const [user] = useState<UserType | null>(() => {
		const storedUser = localStorage.getItem('user');
		return storedUser ? JSON.parse(storedUser) : null;
	});

	// Function to fetch photos based on userId
	const getPhotos = async () => {
		if (user) {
			setLoading(true);
			try {
				const res = await getUserPhotos(user.$id);
				setPhotos(res);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		if (user) {
			getPhotos();
		}
	}, [user]);

	return (
		<globalPhotoContext.Provider value={{ photos, setPhotos, getPhotos, loading }}>
			{children}
		</globalPhotoContext.Provider>
	);
};

export default PhotoContext;

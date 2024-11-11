import { PhotoProps, UserType } from '../../types/custom';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { getUserPhotos } from '../lib/appwrite';

type GlobalContextType = {
	photos: PhotoProps[] | null;
	setPhotos: React.Dispatch<React.SetStateAction<PhotoProps[] | null>>;
	getPhotos: (suppliedId?: string) => Promise<void>;
	loading: boolean;
	error: string;
};

const globalPhotoContext = createContext<GlobalContextType>({
	photos: null,
	setPhotos: () => { },
	getPhotos: async () => { },
	loading: false,
	error: '',
});

export const usePhotoContext = () => useContext(globalPhotoContext);

const PhotoContext = ({ children }: { children: ReactNode }) => {
	const [photos, setPhotos] = useState<PhotoProps[] | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('')

	const [user] = useState<UserType | null>(() => {
		const storedUser = localStorage.getItem('user');
		return storedUser ? JSON.parse(storedUser) : null;
	});

	// Function to fetch photos based on userId
	const getPhotos = async (suppliedId?: string) => {

		if (user || suppliedId) {
			setLoading(true);
			try {
				const res = await getUserPhotos(suppliedId ? suppliedId : user?.$id);
				setPhotos(res);
			} catch (error) {
				setError(error as string)
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
		<globalPhotoContext.Provider value={{ photos, setPhotos, getPhotos, loading, error }}>
			{children}
		</globalPhotoContext.Provider>
	);
};

export default PhotoContext;

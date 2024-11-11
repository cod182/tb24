import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

// Define the shape of our context
interface LocationContextType {
	latitude: number | null;
	longitude: number | null;
	updateLocation: () => void;
	error: string;
	setError: React.Dispatch<React.SetStateAction<string>>;
}

// Default Value
const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [latitude, setLatitude] = useState<number | null>(null);
	const [longitude, setLongitude] = useState<number | null>(null);
	const [error, setError] = useState('')

	// Function to update location using geolocation
	const updateLocation = () => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLatitude(position.coords.latitude);
					setLongitude(position.coords.longitude);
				},
				(error) => {
					setError(`Error fetching location: ${error.message}`)
				}
			);
		} else {
			console.error("Geolocation is not supported by this browser.");
		}
	};

	// get location on component mount
	useEffect(() => {
		updateLocation();
	}, []);

	return (
		<LocationContext.Provider value={{ latitude, longitude, updateLocation, error, setError }}>
			{children}
		</LocationContext.Provider>
	);
};


export const useLocation = (): LocationContextType => {
	const context = useContext(LocationContext);
	if (!context) {
		throw new Error("useLocation must be used within a LocationProvider");
	}
	return context;
};
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { getCurrentUser } from '../lib/appwrite'

interface User {
	// Define the properties of the User type here
	id: number;
	name: string;
	email: string;
	// Add any other properties
}

interface GlobalContextType {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const globalContext = createContext<GlobalContextType>({
	user: null,
	setUser: () => { },  // Updated placeholder function
});

export const useGlobalContext = () => useContext(globalContext);

const UserContext = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		getCurrentUser()
			.then((res) => {
				setUser(res ? res : null);
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<globalContext.Provider value={{ user, setUser }}>
			{children}
		</globalContext.Provider>
	);
};

export default UserContext;

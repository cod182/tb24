import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { getCurrentUser } from '../lib/appwrite';

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
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	loading: boolean;
}

const globalContext = createContext<GlobalContextType>({
	user: null,
	setUser: () => { },
	isLoggedIn: false,
	setIsLoggedIn: () => { },
	loading: true,
});

export const useGlobalContext = () => useContext(globalContext);

const UserContext = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(() => {
		const storedUser = localStorage.getItem('user');
		return storedUser ? JSON.parse(storedUser) : null;
	});

	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
		const storedLoggedIn = localStorage.getItem('isLoggedIn');
		return storedLoggedIn === 'true' ? true : false;
	});

	const [loading, setLoading] = useState(true);

	console.log(isLoggedIn);
	console.log(user);

	useEffect(() => {
		if (isLoggedIn) {
			getCurrentUser()
				.then((res) => {
					setUser(res ? res : null);
				})
				.catch((error) => console.log(error))
				.finally(() => setLoading(false));
		} else {
			setUser(null);
			setLoading(false);
		}
	}, [isLoggedIn]);

	// Save user and isLoggedIn state to localStorage whenever they change
	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
	}, [user, isLoggedIn]);

	return (
		<globalContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, loading }}>
			{children}
		</globalContext.Provider>
	);
};

export default UserContext;

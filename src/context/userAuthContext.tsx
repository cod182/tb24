import React, { ReactNode, createContext, useState } from 'react';

type UserProps = {
	id: number;
	username: string;
	email: string;
	image: string;
}


interface UserContextType {
	user: UserProps | null;
	setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	// Initial state for the user is `null` (unauthenticated)
	const [user, setUser] = useState<UserProps | null>(null);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
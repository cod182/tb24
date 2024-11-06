import { account } from './appwrite.js';
export const login = async (email, password) => {
	const data = await account.createEmailPasswordSession(email, password);
	return data;
}

export const getCurrentSession = async () => {
	const session = await account.getSession('current');
	return session;
}
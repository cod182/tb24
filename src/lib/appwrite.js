import { Account, Client, Databases, ID, Query, Storage } from 'appwrite';

const client = new Client();
client
	.setEndpoint('https://cloud.appwrite.io/v1')
	.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);
const storage = new Storage(client);
export const account = new Account(client);
export { ID } from 'appwrite';

export const login = async (email, password) => {
	try {
		const session = await account.createEmailPasswordSession(email, password);

		return session;
	} catch (error) {
		throw new Error(error);
	}
}

export const signOut = async () => {
	try {
		const session = await account.deleteSession('current');
		return session;
	} catch (error) {
		throw new Error(error);
	}
}


export const createNewUser = async (email, password, username, image) => {
	try {
		const newAccount = await account.create(ID.unique(), email, password, username);
		if (!newAccount) throw Error;

		await login(email, password);

		const { fileUrl } = await uploadFile(image, "image")

		const newUser = await databases.createDocument(
			import.meta.env.VITE_APPWRITE_DATABASE_ID,
			import.meta.env.VITE_APPWRITE_USER_COLLECTION,
			ID.unique(), {
			accountId: newAccount.$id,
			email: email,
			username: username,
			image: fileUrl
		});


		return newUser;
	} catch (err) {
		throw new Error(err.message)
	}
}

export const getCurrentSession = async () => {
	const session = await account.getSession('current');
	return session;
}

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();

		if (!currentAccount) throw Error

		const currentUser = await databases.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ID, import.meta.env.VITE_APPWRITE_USER_COLLECTION, [Query.equal('accountId', currentAccount.$id)])

		if (!currentUser) throw Error


		return currentUser.documents[0];

	} catch (error) {
		console.log(error);

	}
}

export const uploadFile = async (file, type) => {

	if (!file) return;

	try {
		const uploadedFile = await storage.createFile(
			import.meta.env.VITE_APPWRITE_USER_IMAGE_STORAGE_ID,
			ID.unique(),
			file
		)


		const fileUrl = await getFilePreview(uploadedFile.$id, type)

		const object = { fileUrl: fileUrl, fileId: uploadedFile.$id };

		return object;

	} catch (error) {
		throw new Error(error)
	}
}

export const getFilePreview = async (fileId, type) => {
	let fileUrl

	try {
		if (type === 'image') {
			fileUrl = storage.getFileView(import.meta.env.VITE_APPWRITE_USER_IMAGE_STORAGE_ID, fileId, 2000, 2000, 'top', 100)
		} else {
			throw new Error('Invalid file Type')
		}

		if (!fileUrl) throw Error;
		return fileUrl;

	} catch (error) {
		throw new Error(error);
	}
}

export const getUserPhotos = async (userId) => {
	try {
		const userPhotos = await databases.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ID, import.meta.env.VITE_APPWRITE_PHOTOS_COLLECTION, [Query.equal('ownerId', userId)])
		return userPhotos.documents;
	} catch (error) {
		throw new Error(error);
	}
}


export const uploadUserImage = async (file, userId) => {
	const { fileUrl, fileId } = await uploadFile(file, "image")

	const newImageUpload = await databases.createDocument(
		import.meta.env.VITE_APPWRITE_DATABASE_ID,
		import.meta.env.VITE_APPWRITE_PHOTOS_COLLECTION,
		ID.unique(), {
		ownerId: userId,
		imageUrl: fileUrl,
		imageId: fileId
	});
	console.log(newImageUpload)
	return newImageUpload;
}


export const deleteImage = async (imageId, documentId) => {
	try {
		// Deleting from storage bucket
		const sr = await storage.deleteFile(import.meta.env.VITE_APPWRITE_USER_IMAGE_STORAGE_ID, imageId);
		// Deleting from collection
		const dbd = await databases.deleteDocument(
			import.meta.env.VITE_APPWRITE_DATABASE_ID,
			import.meta.env.VITE_APPWRITE_PHOTOS_COLLECTION,
			documentId
		);
		return { bucket: sr, collection: dbd }

	} catch (error) {
		console.error(`Error deleting image with ID ${imageId}:`, error);
		throw new Error(`Failed to delete image with ID ${imageId}`);
	}
};

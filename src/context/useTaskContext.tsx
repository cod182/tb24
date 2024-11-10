import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { TaskProps } from '../../types/custom';
import { getTasks } from '../lib/appwrite';

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
	tasks: TaskProps[] | null;
	setTasks: React.Dispatch<React.SetStateAction<TaskProps[] | null>>;
	getAllTasks: (suppliedId?: string) => Promise<void>;
	loading: boolean;
	error: string;
};

const globalTaskContext = createContext<GlobalContextType>({
	tasks: null,
	setTasks: () => { },
	getAllTasks: async () => { },
	loading: false,
	error: '',
});

export const useTaskContext = () => useContext(globalTaskContext);

const TaskContext = ({ children }: { children: ReactNode }) => {
	const [tasks, setTasks] = useState<TaskProps[] | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('')

	const [user] = useState<UserType | null>(() => {
		const storedUser = localStorage.getItem('user');
		return storedUser ? JSON.parse(storedUser) : null;
	});


	const getAllTasks = async (suppliedId?: string) => {

		if (user || suppliedId) {
			setLoading(true);
			try {
				const res = await getTasks(suppliedId ? suppliedId : user?.$id);
				setTasks(res);
			} catch (error) {
				setError(error as string)
			} finally {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		if (user) {
			getAllTasks();
		}
	}, [user]);

	return (
		<globalTaskContext.Provider value={{ tasks, setTasks, getAllTasks, loading, error }}>
			{children}
		</globalTaskContext.Provider>
	);
};

export default TaskContext;

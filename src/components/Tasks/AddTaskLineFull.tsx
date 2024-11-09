import { MdAdd, MdError } from 'react-icons/md';
import React, { useState } from 'react'

import { BiSave } from 'react-icons/bi';
import { GiSandsOfTime } from 'react-icons/gi';
import { TaskProps } from '../../../types/custom';
import { createTask } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/userAuthContext';
import { useTaskContext } from '../../context/useTaskContext';

const AddTaskLineFull = () => {

	const { setTasks, tasks } = useTaskContext();
	const { user } = useGlobalContext();
	const taskInitial = {
		title: '',
		description: '',
		ownerId: user ? user.$id : '',
		completed: false,
	}

	// STATES
	const [popOutState, setPopOutState] = useState(false);
	const [task, setTask] = useState<TaskProps>(taskInitial)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string>()

	const handleAddTask = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true)
		try {
			const response = await createTask(task)
			if (response) {
				// reassigns tasks
				const currTasks: TaskProps[] = [];
				if (tasks) {
					currTasks.push(...tasks)
					// Create a new task object and attach it's ID form the response
					const newTask = { ...task, $id: response.$id }
					// Pushes new task into array
					currTasks.push(newTask);
					// Sets tasks array in context to save on api calls
					setTasks(currTasks);
				}

				setLoading(false);
				setPopOutState(false);
				setTask(taskInitial);
				setError('');
			}
		} catch {
			setLoading(false);
			setError('Error Uploading Image');
		}
	}

	return (
		<div className='flex flex-row items-start justify-start w-full h-full overflow-hidden'>

			<MdAdd className={`md:h-[100px] md:w-[100px] h-[80px] w-[80px] transition-all duration-200 ease cursor-pointer ${popOutState ? 'text-red-500 hover:text-red-400 rotate-[225deg]' : 'text-yellow-300 hover:text-yellow-400 rotate-0'}`} onClick={() => setPopOutState(!popOutState)} />


			{/* Adding Form */}
			<div className={`flex flex-row items-start justify-start h-full gap-2 mt-2 sm:mt-0 ${popOutState ? 'w-[100%]' : 'w-[0%]'} overflow-hidden transition-all duration-200 ease `}>
				<form onSubmit={handleAddTask} className="flex flex-col items-start justify-start w-full h-full gap-2 mt-2 md:flex-row grow sm:mt-0" >

					<input onChange={(e) => setTask({ ...task, title: e.target.value })} value={task.title} className="w-full h-full p-4 text-2xl font-semibold text-black rounded-lg text-start" placeholder="Enter Task Title" />

					<textarea onChange={(e) => setTask({ ...task, description: e.target.value })} value={task.description} className="w-full p-4 overflow-scroll text-lg font-semibold text-black rounded-lg resize-none h-fit text-start" placeholder="Enter Task Description (Optional)" />

					<button disabled={!task.title} className={`w-fit h-fit`}>
						{error ? (
							<MdError className="h-full text-red-600 w-fit animate-pulse" />
						) : loading ? (
							<GiSandsOfTime className="h-full w-fit animate-spin" />
						) :
							<BiSave className={`${!task.title ? 'text-gray-600 select-none' : 'text-black cursor-pointer hover:text-green-400'}  h-[50px] transition-all duration-200 w-fit ease `} onClick={handleAddTask} />
						}
					</button>
				</form>
			</div>



		</div>
	)
}

export default AddTaskLineFull
import { BiError, BiTaskX } from 'react-icons/bi';

import AddTask from './AddTask';
import { CgClose } from 'react-icons/cg';
import { GrTask } from 'react-icons/gr';
import Loader from '../Loader';
import { TaskProps } from '../../../types/custom';
import { createTask } from '../../lib/appwrite';
import { useState } from 'react';
import { useTaskContext } from '../../context/useTaskContext';

const AddTaskPopUp = ({ userId }: { userId: string }) => {
	const { getAllTasks } = useTaskContext();

	const taskInitial = {
		title: '',
		description: '',
		ownerId: userId,
		completed: false,
	};

	// STATES
	const [popUpState, setPopUpState] = useState(false);
	const [task, setTask] = useState<TaskProps>(taskInitial);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>('');

	// Functions
	const handleAddTask = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await createTask(task);
			if (response) {
				getAllTasks();
				setLoading(false);
				setPopUpState(false);
				setTask(taskInitial);
				setError('');
			}
		} catch (error: unknown) {
			setLoading(false);
			setError('Failed to add task.');
			console.log(error)
		}
	};

	if (loading) return <Loader title="Adding Task" icon={GrTask} />;
	if (error) return <Loader title="Error!" subText={error} icon={BiError} />;

	return (
		<div className="relative flex flex-col items-center justify-center w-full h-full gap-2">
			{/* PopUp Modal */}
			<div
				className={`${popUpState ? 'h-full py-2 pt-9' : 'h-[0%] py-0 pt-0'
					} px-2 overflow-hidden flex w-full absolute top-0 bg-gray-200/80 rounded-lg transition-all duration-200 ease flex-col items-center justify-center z-[2]`}
			>
				<button
					className="absolute p-2 transition-all duration-200 rounded-full top-1 right-2 bg-yellow-300/70 hover:bg-yellow-400/90 hover:text-white ease"
					onClick={() => setPopUpState(false)}
					aria-label="Close task popup"
				>
					<CgClose />
				</button>

				<AddTask handleSubmit={handleAddTask} setTask={setTask} task={task} />
			</div>

			<div
				className="flex flex-col items-center justify-center w-full h-full gap-2 cursor-pointer group"
				onClick={() => setPopUpState(true)}
			>
				<p className="text-3xl text-center transition-all duration-200 ease group-hover:text-yellow-300">
					Add Task
				</p>
				<BiTaskX className="w-16 h-16 group-hover:rotate-[10deg] transition-all duration-200 ease" />
			</div>
		</div>
	);
};

export default AddTaskPopUp;

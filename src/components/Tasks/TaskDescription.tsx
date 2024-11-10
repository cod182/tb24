import { BiSave } from "react-icons/bi";
import { GiSandsOfTime } from "react-icons/gi";
import { MdError } from "react-icons/md";
import { PiCheckBold } from "react-icons/pi";
import { TaskProps } from "../../../types/custom";
import { updateTask } from '../../lib/appwrite';
import { useState } from "react";
import { useTaskContext } from '../../context/useTaskContext';

type Props = {
	task: TaskProps;
};

const TaskDescription = ({ task }: Props) => {
	const { setTasks, tasks } = useTaskContext();

	const [taskDescription, setTaskDescription] = useState(task.description);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');

	const handleUpdate = async () => {
		setLoading(true);
		try {
			await updateTask(task.$id, { ...task, description: taskDescription });

			// Update the local task state
			const newTaskArray = tasks?.map((curr) =>
				curr.$id === task.$id ? { ...curr, description: taskDescription } : curr
			);
			setTasks(newTaskArray ?? []);

			setLoading(false);
			setSuccess(true);
			setTimeout(() => setSuccess(false), 1000);
		} catch (error: unknown) {
			setLoading(false);
			setError('Error saving task');
			console.log(error)
		}
	};

	// Start update when input loses focus and task description has changed
	const handleBlur = () => {
		if (taskDescription !== task.description) {
			handleUpdate();
		}
	};

	return (
		<form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} className="relative w-full">
			<textarea
				className="pr-[45px] border-b-[2px] bg-transparent border-white text-white w-full overflow-scroll text-xl placeholder:text-gray-500 placeholder:text-base placeholder:italic"
				value={taskDescription}
				onChange={(e) => setTaskDescription(e.target.value)}
				onBlur={handleBlur}
				placeholder="Edit task description"
			/>
			<div className="absolute top-0 right-0 h-full p-2 w-[40px] md:w-fit">
				{error ? (
					<MdError className="h-[40px] text-red-600 w-fit animate-pulse" aria-label="Error saving task" />
				) : loading ? (
					<GiSandsOfTime className="h-[40px] w-[40px] md:w-fit animate-spin text-white" aria-label="Saving task..." />
				) : success ? (
					<PiCheckBold className="h-[40px] text-green-700 animate-pulse w-[40px] md:w-fit" aria-label="Task saved successfully" />
				) : (
					<BiSave
						className="transition-all duration-200 cursor-pointer text-white h-[40px] w-[40px] md:w-fit hover:text-gray-600 ease"
						onClick={handleUpdate}
						aria-label="Save task"
					/>
				)}
			</div>
		</form>
	);
};

export default TaskDescription;

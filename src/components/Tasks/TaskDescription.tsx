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

			// creates a new array with the updated task
			const newTaskArray = tasks?.map((curr) =>
				curr.$id === task.$id ? { ...curr, description: taskDescription } : curr
			);
			// Updates task context to save on api call
			setTasks(newTaskArray ?? []);

			setLoading(false);
			setSuccess(true);
			setTimeout(() => {
				setSuccess(false);
			}, 1000);
		} catch (error) {
			setLoading(false);
			setError(error as string);
		}
	};

	// start update when input loses focus and task description has changed
	const handleBlur = () => {
		if (taskDescription !== task.description) {
			handleUpdate();
		}
	};

	return (
		<form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} className="relative w-full">
			<textarea
				className="pr-8 border-b-[2px] bg-transparent border-black w-full overflow-scroll text-xl text-ellipsis whitespace-nowrap placeholder:text-gray-500 placeholder:text-base placeholder:italic"
				value={taskDescription}
				onChange={(e) => setTaskDescription(e.target.value)}
				onBlur={handleBlur}
				placeholder="Task Description (Optional)"
			/>
			<div className="absolute top-0 right-0 h-full p-2 w-fit">
				{error ? (
					<MdError className="h-[40px] text-red-600 w-fit animate-pulse" />
				) : loading ? (
					<GiSandsOfTime className="h-[40px] w-fit animate-spin" />
				) : success ? (
					<PiCheckBold className="h-[40px] text-green-700 animate-pulse w-fit" />
				) : <BiSave className="transition-all duration-200 cursor-pointer h-[40px] w-fit hover:text-gray-600 ease" onClick={handleUpdate} />
				}
			</div>
		</form>
	);
};

export default TaskDescription;

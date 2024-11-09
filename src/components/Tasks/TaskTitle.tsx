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

const TaskTitle = ({ task }: Props) => {
	const { setTasks, tasks } = useTaskContext();

	const [taskTitle, setTaskTitle] = useState(task.title);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');

	const handleUpdate = async () => {

		setLoading(true);
		try {
			await updateTask(task.$id, { ...task, title: taskTitle });

			// creates a new array with the updated task
			const newTaskArray = tasks?.map((curr) =>
				curr.$id === task.$id ? { ...curr, title: taskTitle } : curr
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

	// start update when input loses focus and task title has changed
	const handleBlur = () => {
		if (taskTitle !== task.title) {
			handleUpdate();
		}
	};

	return (
		<form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} className="relative w-full">
			<input
				className="text-3xl pr-8 border-b-[2px] bg-transparent border-white text-white w-full overflow-hidden text-ellipsis whitespace-nowrap"
				type="text"
				value={taskTitle}
				onChange={(e) => setTaskTitle(e.target.value)}
				onBlur={handleBlur}
			/>
			<div className="absolute top-0 right-0 h-full p-2 w-fit">
				{error ? (
					<MdError className="h-full text-red-600 w-fit animate-pulse" />
				) : loading ? (
					<GiSandsOfTime className="h-full w-fit animate-spin" />
				) : success ? (
					<PiCheckBold className="h-full text-green-700 animate-pulse w-fit" />
				) : null}
			</div>
		</form>
	);
};

export default TaskTitle;

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
		if (!taskTitle.trim()) {
			setError('Title cannot be empty');
			return;
		}

		setLoading(true);
		try {
			await updateTask(task.$id, { ...task, title: taskTitle });

			const newTaskArray = tasks?.map((curr) =>
				curr.$id === task.$id ? { ...curr, title: taskTitle } : curr
			);

			setTasks(newTaskArray ?? []);
			setLoading(false);
			setSuccess(true);
			setTimeout(() => setSuccess(false), 1000);
		} catch (error: unknown) {
			setLoading(false);
			setError('An error occurred while updating the task');
			console.log(error)
		}
	};

	const handleBlur = () => {
		if (taskTitle !== task.title) {
			handleUpdate();
		}
	};

	return (
		<form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} className="relative w-full">
			<input
				id='title'
				className="text-3xl pr-8 border-b-[2px] bg-transparent border-white text-white w-full overflow-hidden text-ellipsis whitespace-nowrap"
				type="text"
				value={taskTitle}
				onChange={(e) => setTaskTitle(e.target.value)}
				onBlur={handleBlur}
				aria-describedby={error ? "error-message" : undefined}
			/>
			<div className="absolute top-0 right-0 h-full p-2 w-fit">
				{error && (
					<div id="error-message" className="text-red-600">
						<MdError className="h-full w-[40px] md:w-fit animate-pulse" aria-live="assertive" />
					</div>
				)}
				{loading && (
					<GiSandsOfTime className="h-full w-[40px] md:w-fit animate-spin" aria-live="polite" />
				)}
				{success && (
					<PiCheckBold className="h-full text-green-700 animate-pulse w-[40px] md:w-fit" aria-live="polite" />
				)}
			</div>
		</form>
	);
};

export default TaskTitle;

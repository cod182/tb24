import { PiCheckBold } from 'react-icons/pi';
import { SiCodesandbox } from "react-icons/si";
import { TaskProps } from '../../../types/custom';
import { updateTask } from '../../lib/appwrite';
import { useTaskContext } from '../../context/useTaskContext';

type Props = {
	task: TaskProps;
};

const Checkbox = ({ task }: Props) => {
	const { setTasks, tasks } = useTaskContext();

	const handleUpdateCompleted = async () => {
		// Update task in db
		await updateTask(task.$id, { ...task, completed: !task.completed });

		// Update the local in new array
		const newTaskArray = tasks?.map((curr) =>
			curr.$id === task.$id ? { ...curr, completed: !curr.completed } : curr
		);

		// Update the task list in context with the new array saving on API calls
		setTasks(newTaskArray ?? []);
	};

	return (
		<div
			className="relative flex flex-row items-center justify-center cursor-pointer"
			onClick={handleUpdateCompleted}
		>
			<SiCodesandbox className="w-auto h-[40px] aspect-square text-yellow-300 bg-white overflow-hidden rounded-sm" />
			{task.completed && (
				<PiCheckBold className="w-auto h-[40px] aspect-square absolute left-1 bottom-1 text-black" />
			)}
		</div>
	);
};

export default Checkbox;

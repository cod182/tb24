
import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { TaskProps } from '../../../types/custom'
import { PiCheckBold } from 'react-icons/pi'
import { useTaskContext } from '../../context/useTaskContext';
import { updateTask } from '../../lib/appwrite';

type Props = {
	task: TaskProps
}
const Checkbox = ({ task }: Props) => {
	const { setTasks, tasks } = useTaskContext();

	const handleUpdateCompleted = async () => {
		await updateTask(task.$id, { ...task, completed: !task.completed });

		const newTaskArray = tasks?.map((curr) =>
			curr.$id === task.$id ? { ...curr, completed: !curr.completed } : curr
		);

		setTasks(newTaskArray ?? []);
	}

	return (
		<div className="relative flex flex-row items-center justify-center cursor-pointer" onClick={handleUpdateCompleted}>
			<MdCheckBoxOutlineBlank className="w-auto h-[40px] aspect-square" />
			{task.completed &&
				<PiCheckBold className="w-auto h-[40px] aspect-square absolute left-1 bottom-1 text-yellow-300" />
			}
		</div>
	)
}

export default Checkbox
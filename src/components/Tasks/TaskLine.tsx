
import { TaskProps } from "../../../types/custom"
import Checkbox from "./Checkbox"
import TaskTitle from "./TaskTitle"

type Props = {
	task: TaskProps
}
const TaskLine = ({ task }: Props) => {
	return (
		<div className="flex flex-row items-center justify-between w-full h-full gap-2 flex-nowrap " >

			{/* Title */}
			<TaskTitle task={task} />

			{/* Checkbox */}
			<Checkbox task={task} />
		</div >
	)
}

export default TaskLine
import Checkbox from "./Checkbox"
import TaskDescription from "./TaskDescription";
import { TaskProps } from "../../../types/custom"
import TaskTitle from "./TaskTitle"

type Props = {
	task: TaskProps;
	title?: boolean;
	checkbox?: boolean;
	description?: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TaskLine = ({ task, title, checkbox, description }: Props) => {
	return (
		<div className="flex flex-row items-center justify-center w-full h-full gap-2 flex-nowrap " >

			{/* Title */}
			{title && (
				<TaskTitle task={task} />
			)}

			{description && (
				<TaskDescription task={task} />
			)}

			{/* Checkbox */}
			{checkbox && (
				<Checkbox task={task} />
			)}
		</div >
	)
}

export default TaskLine
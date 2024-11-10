import Checkbox from "./Checkbox";
import TaskDescription from "./TaskDescription";
import { TaskProps } from "../../../types/custom";
import TaskTitle from "./TaskTitle";

type Props = {
	task: TaskProps;
	title?: boolean;
	checkbox?: boolean;
	description?: boolean;
};

const TaskLine = ({ task, title = false, checkbox = false, description = false }: Props) => {
	return (
		<div className="flex flex-row items-center justify-center w-full h-full gap-2 flex-nowrap">
			{title && <TaskTitle task={task} />}

			{description && <TaskDescription task={task} />}

			{checkbox && <Checkbox task={task} />}
		</div>
	);
};

export default TaskLine;

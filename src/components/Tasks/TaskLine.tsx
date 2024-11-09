
import { TaskProps } from "../../../types/custom"
import { PiCheckBold } from "react-icons/pi"
import { MdCheckBoxOutlineBlank } from "react-icons/md"

type Props = {
	task: TaskProps
}
const TaskLine = ({ task }: Props) => {
	return (
		<div className="flex flex-row items-center justify-between w-full h-full gap-2 flex-nowrap " >
			{/* Title */}
			<p className="text-3xl border-b-[2px] border-black w-full overflow-hidden text-ellipsis whitespace-nowrap">
				{task.title}
			</p>
			{/* Checkbox */}
			<div className="relative flex flex-row items-center justify-center">
				<MdCheckBoxOutlineBlank className="w-auto h-[40px] aspect-square" />
				{task.completed &&
					<PiCheckBold className="w-auto h-[40px] aspect-square absolute left-1 bottom-1 text-yellow-300" />
				}
			</div>
		</div >
	)
}

export default TaskLine
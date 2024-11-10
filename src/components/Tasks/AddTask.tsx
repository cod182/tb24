import { TaskProps } from "../../../types/custom";

const AddTask = ({ handleSubmit, setTask, task }: { handleSubmit: (e: React.FormEvent) => void; setTask: React.Dispatch<React.SetStateAction<TaskProps>>, task: TaskProps }) => {

	return (
		<form onSubmit={handleSubmit} className="flex flex-col items-center justify-start w-full h-full gap-2 mt-2 grow sm:mt-0">
			{/* Task Title */}
			<input
				id='title'
				onChange={(e) => setTask({ ...task, title: e.target.value })}
				value={task.title}
				className="w-full h-fit py-2 px-4 text-start text-black font-semibold rounded-lg z-[4]"
				placeholder="Enter Task Title"
				autoFocus
			/>

			{/* Task Description */}
			<textarea
				id='description'
				onChange={(e) => setTask({ ...task, description: e.target.value.trim() })}
				value={task.description}
				className="resize-none w-full h-fit sm:py-2 px-4 text-start text-black font-semibold rounded-lg z-[4] overflow-scroll"
				placeholder="Enter Task Description (Optional)"
			/>

			{/* Submit  */}
			<button
				type="submit"
				disabled={!task.title}
				className={`w-full h-fit py-2 px-4 text-center text-black font-semibold rounded-lg z-[4] ${task.title ? 'bg-yellow-300/70 hover:bg-yellow-400/90 text-black' : 'bg-gray-300 text-gray-600'}`}
			>
				{task.title ? 'Add Task' : 'Enter Task'}
			</button>
		</form>
	);
};

export default AddTask;

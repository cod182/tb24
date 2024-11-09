import { BiTrash } from "react-icons/bi";
import Checkbox from "./Checkbox";
import { GiSandsOfTime } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io";
import { MdError } from "react-icons/md";
import { PiCheckBold } from "react-icons/pi";
import TaskDescription from "./TaskDescription";
import { TaskProps } from "../../../types/custom";
import TaskTitle from "./TaskTitle";
import { TiTick } from "react-icons/ti";
import { deleteTask } from '../../lib/appwrite'
import { useState } from "react";
import { useTaskContext } from '../../context/useTaskContext';

type Props = {
	task: TaskProps;
}
const TaskLineFull = ({ task }: Props) => {
	const { tasks, setTasks } = useTaskContext();

	// use State
	const [editing, setEditing] = useState(false)
	const [checkDelete, setCheckDelete] = useState(false);
	const [error, setError] = useState<string>();
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	// Functions
	const handleDelete = async () => {
		if (checkDelete) {
			setLoading(true);
			try {
				// Calls the functions to delete from appwrite storage and collection
				await deleteTask(task.$id);
				if (tasks) {
					// Saving from making another API call, just updating the locall state when deleting from db
					const newTaskArray = tasks.filter(
						(ind) => ind.$id != task.$id
					)
					setTasks(newTaskArray);
					setLoading(false);
					setSuccess(true)
				}
			} catch (error) {
				setLoading(false);
				setError('Error Deleting Photo');
				console.error('Failed to delete photo:', error);

				setTimeout(() => {
					setError('');
				}, 2000)
			}
			setCheckDelete(false);

		} else {
			setCheckDelete(true);
		}
	}

	return (
		<div key={task.$id} className='flex flex-col items-center justify-center w-full'>

			<div className="flex flex-row items-center justify-center w-full h-full gap-2 flex-nowrap " >
				<div className='relative w-full'>

					{/* Close Editing */}
					<IoIosArrowDropdown className={`${editing ? 'top-[-110%] right-[-45px] z-[3]' : 'top-0 right-0 z-[-10]'}  cursor-pointer absolute  right-0 h-full text-3xl transition-all duration-200 w-fit ease hover:text-yellow-300`} onClick={() => { setEditing(false); setCheckDelete(false); }} />

					{/* DELETING */}
					<div className={`${editing ? 'right-[-10%] z-[3]' : 'right-0 z-[-10]'} absolute  right-0 h-full transition-all duration-200 w-fit ease flex flex-row items-center justify-center`}>
						{error ? (
							<MdError className="h-full text-red-600 w-fit animate-pulse" />
						) : checkDelete ? (

							<>
								<TiTick className='h-full text-green-400 transition-all duration-200 cursor-pointer w-fit hover:scale-110 hover:text-green-300 hover:animate-pulse ease' onClick={() => {
									handleDelete();
								}} />
								<IoClose className='h-full text-red-400 transition-all duration-200 cursor-pointer w-fit hover:scale-110 hover:text-red-300 hover:animate-pulse ease' onClick={() => setCheckDelete(false)} />
							</>
						) : loading ? (
							<GiSandsOfTime className="h-full w-fit animate-spin" />
						) : success ? (
							<PiCheckBold className="h-full text-green-700 animate-pulse w-fit" />
						) :
							<BiTrash className={`cursor-pointer absolute  right-0 h-full text-3xl transition-all duration-200 w-fit ease text-red-500 hover:text-red-600`} onClick={handleDelete} />
						}
					</div>

					{/* Title */}
					<div className={`relative w-full transition-all duration-200 ease ${editing ? 'translate-y-[-110%]' : ''}`} onClick={() => setEditing(true)}>
						<TaskTitle task={task} />
					</div>

					{/* Description */}
					<div className={`absolute left-0 top-0 w-full ${editing ? 'flex' : 'hidden'}`}>
						<TaskDescription task={task} />
					</div>
				</div>

				{/* Checkbox */}
				<Checkbox task={task} />

			</div >
		</div>
	)
}

export default TaskLineFull
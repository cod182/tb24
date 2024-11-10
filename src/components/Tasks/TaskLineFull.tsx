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
				setError('Error Deleting task');
				console.error('Failed to delete task:', error);

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
					<IoIosArrowDropdown className={`${editing ? 'top-[-110%] right-[-45px] z-[3]' : 'top-0 right-0 z-[-10]'}  cursor-pointer absolute text-white right-0 h-full text-3xl transition-all duration-200 w-fit ease hover:text-yellow-300`} onClick={() => { setEditing(false); setCheckDelete(false); }} />

					{/* DELETING */}
					<div className={`${editing ? 'right-[-100px] md:right-[-130px] z-[3] w-fit md:w-[80px] h-[80px] md:h-fit' : 'right-0 z-[-10] w-[0px] h-fit'} absolute  transition-all duration-200 ease flex flex-col md:flex-row items-start justify-start`}>
						{error ? (
							<MdError className="h-[40px] text-red-600 w-fit animate-pulse" />
						) : checkDelete ? (

							<>
								<IoClose className='h-[40px] text-red-400 transition-all duration-200 cursor-pointer w-fit hover:scale-110 hover:text-red-300 hover:animate-pulse ease' onClick={() => setCheckDelete(false)} />
								<TiTick className='h-[40px] text-green-400 transition-all duration-200 cursor-pointer w-fit hover:scale-110 hover:text-green-300 hover:animate-pulse ease' onClick={() => {
									handleDelete();
								}} />
							</>
						) : loading ? (
							<GiSandsOfTime className="h-[40px] w-fit animate-spin" />
						) : success ? (
							<PiCheckBold className="h-[40px] text-green-700 animate-pulse w-fit" />
						) :
							<BiTrash className={`cursor-pointer h-[40px] text-3xl transition-all duration-200 w-fit ease text-red-500 hover:text-red-600`} onClick={handleDelete} />
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
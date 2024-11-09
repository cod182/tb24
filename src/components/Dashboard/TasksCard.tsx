import DashboardCard from './DashboardCard'
import { useTaskContext } from '../../context/useTaskContext';
import { useEffect } from 'react';
import Loader from '../Loader';
import { BiError } from 'react-icons/bi';
import { GoTasklist } from 'react-icons/go';
import AddTaskPopUp from '../Tasks/AddTaskPopUp';
import { useGlobalContext } from '../../context/userAuthContext';

const TasksCard = () => {
	const { tasks, getAllTasks, loading, error } = useTaskContext();
	const { user } = useGlobalContext();

	useEffect(() => {
		getAllTasks();
	}, [])

	return (
		<DashboardCard title='Tasks' link='/tasks'>

			<div className='flex flex-col items-center justify-center w-full h-full gap-2'>
				{error ?
					(
						<Loader title='Error!' subText={error} icon={BiError} />
					)
					: loading ? (
						<Loader title='Loading News' subText='Please wait...' icon={GoTasklist} />
					)
						:
						(tasks && tasks.length > 0) ?
							(
								<div className="grid grid-cols-2 grid-rows-2 gap-4 mx-auto w-fit">
									{tasks.slice(0, 3).map((task) => (
										<div key={task.$id} className="w-full ">
											{/* Task Comp */}
											Task Comp
										</div>
									))}
								</div>
							)
							:
							(
								<>
									{/* No Tasks */}
									<div className='flex flex-col items-center justify-center w-full h-full'>
										{/* Add Task Line */}
										<AddTaskPopUp userId={user ? user.$id : ''} />
									</div>
								</>
							)
				}
			</div>
		</DashboardCard>
	)
}

export default TasksCard
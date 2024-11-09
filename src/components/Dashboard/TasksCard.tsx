import DashboardCard from './DashboardCard'
import { useTaskContext } from '../../context/useTaskContext';
import { useEffect } from 'react';
import Loader from '../Loader';
import { BiError } from 'react-icons/bi';
import { GoTasklist } from 'react-icons/go';

import { useGlobalContext } from '../../context/userAuthContext';
import { TaskLine, AddTaskPopUp } from '../index';

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
								<div className="flex flex-col items-center justify-start w-full h-full gap-4 px-2 py-4">
									{tasks.slice(0, 3).map((task) => (
										<div key={task.$id} className="w-full ">
											<TaskLine task={task} />
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
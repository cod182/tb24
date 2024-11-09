import DashboardCard from './DashboardCard'
import { useTaskContext } from '../../context/useTaskContext';
import { useEffect } from 'react';

const TasksCard = () => {
	const { tasks, getAllTasks, loading, error } = useTaskContext();

	useEffect(() => {
		getAllTasks();
	}, [])



	return (
		<DashboardCard title='Tasks' link='/tasks'>
			<p className='text-3xl'>Headline</p>
			<p className='text-2xl'>Body</p>
		</DashboardCard>
	)
}

export default TasksCard
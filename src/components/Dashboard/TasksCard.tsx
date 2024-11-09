import DashboardCard from './DashboardCard'

const TasksCard = () => {
	return (
		<DashboardCard title='Tasks' link='/tasks'>
			<p className='text-3xl'>Headline</p>
			<p className='text-2xl'>Body</p>
		</DashboardCard>
	)
}

export default TasksCard
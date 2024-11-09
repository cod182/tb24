import { BiError, BiWorld } from 'react-icons/bi';
import { Loader, PageTitleWithNav } from '../components';
import { useEffect, useState } from 'react';

import AddTaskLineFull from '../components/Tasks/AddTaskLineFull';
import TaskLineFull from '../components/Tasks/TaskLineFull';
import { TaskProps } from '../../types/custom';
import bgImage from '../assets/media/images/dash-bg.webp';
import { useTaskContext } from '../context/useTaskContext';

const Tasks = () => {
	const { tasks, loading, error } = useTaskContext();



	return (
		<div className='w-full min-h-[100dvh] relative p-4 md:p-24'>
			{/* background */}
			<img src={bgImage} alt="background" className='absolute top-0 left-0 select-none h-full w-full z-[-1] blur-sm object-cover' />
			{/* Page Title */}
			<PageTitleWithNav title='Tasks' navLink='/dashboard' titleStyles='text-5xl text-white capitalize md:text-7xl text-start' />

			{error ? (
				<Loader title='Error!' subText={error} icon={BiError} />
			) : loading ? (
				<div className='flex flex-col items-center justify-center w-full h-full'>
					<Loader title='Loading Tasks!' subText='Please wait...' icon={BiWorld} />
				</div>
			) : (
				<div className='flex flex-col items-center justify-center w-full h-full gap-20 py-4 mx-auto mt-20 pe-12 lg:px-24 grow'>
					{tasks?.map((task) => (
						<TaskLineFull task={task} key={task.$id} />
					))}

					<AddTaskLineFull />

				</div>
			)}
		</div>
	)
}

export default Tasks
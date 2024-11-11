import { Fade, Slide } from 'react-awesome-reveal';

import { BiArrowBack } from "react-icons/bi"

const PageTitleWithNav = ({ title, navLink, titleStyles }: { title: string, navLink: string; titleStyles?: string }) => {
	return (
		<div className="flex flex-col w-full">
			<Slide direction="down">
				<h1 className={`mb-2 ${titleStyles}`}>{title}</h1>
			</Slide>

			<div className='w-full'>
				<Fade>
					<a href={navLink} className='group z-[1] px-4 py-2 bg-yellow-300/80 text-black hover:bg-yellow-300/90 rounded-lg flex flex-row items-center justify-center gap-2 w-fit transition-all duration-200 ease'> <BiArrowBack className='inline group-hover:translate-x-[-5px] group-hover:font-bold transition-all duration-200 ease' /> Back</a>
				</Fade>
			</div>
		</div>
	)
}

export default PageTitleWithNav
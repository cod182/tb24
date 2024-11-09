import { BiArrowBack } from "react-icons/bi"

const PageTitleWithNav = ({ title, navLink, titleStyles }: { title: string, navLink: string; titleStyles?: string }) => {
	return (
		<>
			<h1 className={`mb-2 ${titleStyles}`}>{title}</h1>
			<div className='w-full'>
				<a href={navLink} className='group z-[1] px-4 py-2 bg-yellow-300/80 text-black hover:bg-yellow-300/90 rounded-lg flex flex-row items-center justify-center gap-2 w-fit transition-all duration-200 ease'> <BiArrowBack className='inline group-hover:translate-x-[-5px] group-hover:font-bold transition-all duration-200 ease' /> Back</a>
			</div>
		</>
	)
}

export default PageTitleWithNav
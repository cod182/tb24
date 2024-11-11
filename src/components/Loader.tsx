import { BiRefresh } from "react-icons/bi";
import { IconType } from "react-icons";
import React from "react";

const Loader = ({ title, subText, icon, refresh }: { title: string; subText?: string; icon?: IconType | string; refresh?: () => void }) => {
	return (
		<div className='flex flex-col items-center justify-center w-full h-full gap-2 text-center' aria-live="assertive">
			{icon && (
				typeof icon === 'string' ? (
					<img src={icon} alt="Loading icon" className='w-24 h-24 sm:w-16 sm:h-16 animate-pulse' />
				) : (
					React.createElement(icon, { className: 'w-24 h-24 sm:w-16 sm:h-16 animate-pulse' })
				)
			)}
			<div className="flex flex-col items-center justify-center">
				<h1 className='text-3xl sm:text-2xl'>{title}</h1>
				{subText && (
					<p className='text-xl sm:text-lg'>{subText}</p>
				)}
				{refresh && (
					<BiRefresh className="w-[40px] h-[40px] cursor-pointer hover:text-yellow-300 transition-color hover:animate-spin duration-200 ease" onClick={refresh} />
				)
				}
			</div>
		</div>
	);
};


export default Loader;

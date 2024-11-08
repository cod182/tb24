import { IconType } from "react-icons";
import React from "react";

const Loader = ({ title, subText, icon }: { title: string; subText?: string; icon?: IconType | string; }) => {
	return (
		<div className='w-full h-full flex flex-col items-center justify-center gap-2 text-center'>
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
			</div>
		</div>
	);
};

export default Loader;

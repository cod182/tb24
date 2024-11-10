import { BsLink45Deg } from "react-icons/bs";

type Props = {
	title: string;
	children: React.ReactNode;
	link?: string;
	ariaLabel?: string;
};

const DashboardCard = ({ title, children, link, ariaLabel }: Props) => {
	const Wrapper = link ? 'a' : 'div';

	return (
		<div
			className="h-[280px] w-[400px] flex flex-col justify-start items-center border-2 border-yellow-300 bg-gray-300/60 overflow-hidden rounded-lg mx-auto"
		>
			<Wrapper
				href={link}
				className={`w-full h-[60px] bg-yellow-300 relative flex flex-col items-center justify-center transition-all duration-200 ease ${link && 'hover:bg-yellow-400 group'}`}
				aria-label={ariaLabel || `Go to ${title}`}
				role={link ? 'link' : undefined}
				tabIndex={0}
			>
				<p
					className="text-3xl text-center text-black capitalize w-fit h-fit z-[2]"
					role="heading"
					aria-level={2}
				>
					{title}
				</p>

				<div className="absolute top-0 flex flex-row items-center justify-center w-full h-full z-[-1] transition-all duration-300 ease group-hover:z-[1]">
					<BsLink45Deg
						className="text-3xl text-black transition-all duration-200 group-hover:translate-x-20 ease"
						aria-hidden="true"
					/>
				</div>
			</Wrapper>

			<div className="flex flex-col items-center justify-start w-full h-[210px] px-4 py-2">
				{children}
			</div>
		</div>
	);
};

export default DashboardCard;

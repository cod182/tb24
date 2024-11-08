type Props = {
	title: string;
	children: React.ReactNode;
	link?: string;
};

const DashboardCard = ({ title, children, link }: Props) => {
	const Wrapper = link ? 'a' : 'div';

	return (
		<Wrapper
			href={link}
			className={`h-[280px] w-[400px] flex flex-col justify-start items-center border-2 border-yellow-300 bg-gray-300/60 overflow-hidden rounded-lg mx-auto ${link ? 'transition-all duration-200 ease hover:scale-105' : ''
				}`}
		>
			<div className="w-full h-[60px] bg-yellow-300 flex items-center justify-center">
				<p className="text-center text-black text-3xl capitalize">{title}</p>
			</div>

			<div className="w-full h-full flex flex-col items-center justify-start p-4 gap-4">
				{children}
			</div>
		</Wrapper>
	);
};

export default DashboardCard;

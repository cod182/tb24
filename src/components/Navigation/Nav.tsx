import { GrHomeRounded, GrLogout } from 'react-icons/gr';
import { ReactElement, useState } from 'react';

import { BiPhotoAlbum } from 'react-icons/bi';
import { BsNewspaper } from 'react-icons/bs';
import { GoTasklist } from 'react-icons/go';
import { MdShowChart } from "react-icons/md";
import { PiSoccerBall } from 'react-icons/pi';
import { signOut } from '../../lib/appwrite.js';
import { useGlobalContext } from '../../context/userAuthContext';
import { useNavigate } from 'react-router-dom';

const DropdownNav = () => {
	const [isOpen, setIsOpen] = useState(false);

	// Toggle dropdown visibility
	const toggleDropdown = () => setIsOpen(!isOpen);
	const navigate = useNavigate();

	const navLinks: { title: string, link: string, icon: React.ReactElement }[] = [
		{ title: 'News', link: '/latestnews', icon: <BsNewspaper /> },
		{ title: 'Sport', link: '/sport', icon: <PiSoccerBall /> },
		{ title: 'Photos', link: '/photos', icon: <BiPhotoAlbum /> },
		{ title: 'Tasks', link: '/tasks', icon: <GoTasklist /> },
	];

	// Functions
	const logout = async () => {
		await signOut();
		setUser(null);
		setIsLoggedIn(false);
		navigate('/');
	};

	const { isLoggedIn, setIsLoggedIn, setUser } = useGlobalContext();

	return (
		<nav className="relative z-30 h-full w-fit">
			<button
				className="w-full h-full p-0 text-white duration-200 border-2 rounded-md bg-gray-400/70 m-0t border-yellow-300/80 hover:bg-gray-500/90 focus:outline-none transition-al ease"
				onClick={toggleDropdown}
				aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
			>
				<MdShowChart className={`${isOpen ? 'text-blue-300' : 'text-yellow-300'} transition-all duration-200 ease w-[70px] h-[45px] sm:w-[130px] sm:h-[85px] md:w-[230px] md:h-[155px] p-0 m-0`} />
			</button>

			<div className={`absolute left-0 w-48 bg-white rounded-md shadow-lg mt-2 overflow-hidden transition-all duration-200 ease ${isOpen ? 'max-h-[500px]' : 'max-h-[0px]'}`}>
				<ul className="py-2">
					<li>
						<a
							href={`${isLoggedIn ? '/dashboard' : '/'}`}
							className='block w-full px-4 py-2 text-gray-700 transition-all duration-200 ease hover:bg-gray-100 text-start'
							onClick={() => setIsOpen(false)}
							aria-label="Go to home"
						>
							<p className='flex flex-row items-center justify-start w-full gap-2'>
								<span>
									<GrHomeRounded />
								</span>
								Home
							</p>
						</a>
					</li>

					{navLinks.map(({ title, link, icon }: { title: string, link: string, icon?: ReactElement }, index) => (
						<li key={index}>
							<a
								href={link}
								className='block w-full px-4 py-2 text-gray-700 transition-all duration-200 ease hover:bg-gray-100 text-start'
								onClick={() => setIsOpen(false)}
								aria-label={`Go to ${title}`}
							>
								<p className='flex flex-row items-center justify-start w-full gap-2'>
									<span>
										{icon}
									</span>
									{title}
								</p>
							</a>
						</li>
					))}

					<li>
						<button
							className='block w-full px-4 py-2 text-gray-700 transition-all duration-200 ease hover:bg-gray-100 text-start'
							type="button"
							onClick={logout}
							aria-label="Logout"
						>
							<p className='flex flex-row items-center justify-start w-full gap-2'>
								<span>
									<GrLogout />
								</span>
								Logout
							</p>
						</button>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default DropdownNav;

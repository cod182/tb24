import { GrHomeRounded, GrLogout } from 'react-icons/gr';
import { ReactElement, useState } from 'react';

import { BiPhotoAlbum } from 'react-icons/bi';
import { BsNewspaper } from 'react-icons/bs';
import { GoTasklist } from 'react-icons/go';
import { MdShowChart } from "react-icons/md";
import { PiSoccerBall } from 'react-icons/pi';
import { signOut } from '../../lib/appwrite.js';
import { useGlobalContext } from '../../context/userAuthContext';
import { useNavigate } from 'react-router-dom'

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

	// FUnctions

	const logout = async () => {
		await signOut();
		setUser(null);
		setIsLoggedIn(false);
		navigate('/');
	}

	const { isLoggedIn, setIsLoggedIn, setUser } = useGlobalContext();
	return (
		<nav className="relative w-fit h-full">
			<button
				className=" w-full h-full bg-gray-400/70 p-0 m-0t text-white rounded-md border-yellow-300/80 border-2  hover:bg-gray-500/90 focus:outline-none transition-al duration-200 ease"
				onClick={toggleDropdown}
			>
				<MdShowChart className={`${isOpen ? 'text-blue-300' : 'text-yellow-300'} transition-all duration-200 ease w-[70px] h-[45px] sm:w-[130px] sm:h-[85px] md:w-[230px] md:h-[155px] p-0 m-0`} />

			</button>


			<div className={`absolute left-0  w-48 bg-white rounded-md shadow-lg mt-2 overflow-hidden transition-all duration-200 ease ${isOpen ? ' max-h-[500px]' : ' max-h-[0px]'}`}>
				<ul className="py-2">
					<li>
						<a
							href={`${isLoggedIn ? '/dashboard' : '/'}`}
							className='block px-4 py-2 transition-all ease duration-200 text-gray-700 hover:bg-gray-100 w-full text-start'
							onClick={() => setIsOpen(false)}
						>
							<p className='w-full flex flex-row justify-start items-center gap-2'>
								<span>
									<GrHomeRounded />
								</span>
								Home
							</p>
						</a>
					</li>

					{navLinks.map(({ title, link, icon, }: { title: string, link: string, icon?: ReactElement }, index) => (

						<li key={index}>
							<a
								href={link}
								className='block px-4 py-2 transition-all ease duration-200 text-gray-700 hover:bg-gray-100 w-full text-start'
								onClick={() => setIsOpen(false)}
							>
								<p className='w-full flex flex-row justify-start items-center gap-2'>
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
							className='block px-4 py-2 transition-all ease duration-200 text-gray-700 hover:bg-gray-100 w-full text-start'
							type="button"
							onClick={logout}
						>
							<p className='w-full flex flex-row justify-start items-center gap-2'>
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

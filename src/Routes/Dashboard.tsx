

const Dashboard = () => {


	console.log(sessionStorage.user);
	return (
		<div>
			<button
				type="button"
				onClick={async () => {
					sessionStorage.removeItem('user');

				}}
			>
				Logout
			</button>
		</div>
	)
}

export default Dashboard
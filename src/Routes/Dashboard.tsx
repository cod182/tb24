import { account } from '../lib/appwrite.js';

const Dashboard = () => {
	return (
		<div>
			<button
				type="button"
				onClick={async () => {
					// sessionStorage.removeItem('user');
					// await account.deleteSessions();
					const result = await account.listSessions();
					console.log(result);
				}}
			>
				Logout
			</button>
		</div>
	)
}

export default Dashboard
function getGreeting(): string {
	const currentHour = new Date().getHours();

	if (currentHour >= 5 && currentHour < 12) {
		return 'Morning';
	} else if (currentHour >= 12 && currentHour < 18) {
		return 'Day';
	} else {
		return 'Evening';
	}
}

export default getGreeting;
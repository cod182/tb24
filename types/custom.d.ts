export type FeedItem = {
	title: string;
	link: string;
	description: string;
	pubDate: string;
	media: string;
}

export type ClothesItem = {
	id: number;
	date: string;
	clothe: string;
}

export type PhotoProps = {
	$id: string;
	ownerId: string;
	imageUrl: string;
	imageId: string;
}

export type TaskProps = {
	$id?: string;
	ownerId: string;
	title: string;
	description?: string;
	completed: boolean;
}

export type SportType = {
	date: string;
	time: string;
	homeTeam: string;
	awayTeam: string;
	fullTimeHomeGoals: number;
	fullTimeAwayGoals: number;
	fullTimeResult: 'H' | 'D' | 'A' | 'N/A';
	halfTimeHomeGoals: number;
	halfTimeAwayGoals: number;
	halfTimeResult: 'H' | 'D' | 'A' | 'N/A';
	division: string;
	attendance?: string | number;
	referee?: string;
	homeShots?: number;
	awayShots?: number;
	homeShotsOnTarget?: number;
	awayShotsOnTarge?: number;
	homeHitWoodwork?: number;
	awayHitWoodwork?: number;
	homeCorners?: number;
	awayCorners?: number;
	homeFoulsCommitted?: number;
	awayFoulsCommitted?: number;
	homeFreeKicksConceded?: number;
	awayFreeKicksConceded?: number;
	homeOffsides?: number;
	awayOffsides?: number;
	homeYellowCards?: number;
	awayYellowCards?: number;
	homeRedCards?: number;
	awayRedCards?: number;
	homeBookingPoints?: number;
	awayBookingPoints?: number;
};


export type MatchType = {
	Div: string; // League Division
	Date: string; // Match Date (dd/mm/yy)
	Time: string; // Time of match kick off
	HomeTeam: string; // Home Team
	AwayTeam: string; // Away Team
	FTHG: string; // Full Time Home Team Goals
	FTAG: string; // Full Time Away Team Goals
	FTR: string; // Full Time Result (H=Home Win, D=Draw, A=Away Win)
	HTHG: string; // Half Time Home Team Goals
	HTAG: string; // Half Time Away Team Goals
	HTR: string; // Half Time Result (H=Home Win, D=Draw, A=Away Win)

	// Optional fields
	Attendance?: string; // Crowd Attendance
	Referee?: string; // Match Referee
	HS?: string; // Home Team Shots
	AS?: string; // Away Team Shots
	HST?: string; // Home Team Shots on Target
	AST?: string; // Away Team Shots on Target
	HHW?: string; // Home Team Hit Woodwork
	AHW?: string; // Away Team Hit Woodwork
	HC?: string; // Home Team Corners
	AC?: string; // Away Team Corners
	HF?: string; // Home Team Fouls Committed
	AF?: string; // Away Team Fouls Committed
	HFKC?: string; // Home Team Free Kicks Conceded
	AFKC?: string; // Away Team Free Kicks Conceded
	HO?: string; // Home Team Offsides
	AO?: string; // Away Team Offsides
	HY?: string; // Home Team Yellow Cards
	AY?: string; // Away Team Yellow Cards
	HR?: string; // Home Team Red Cards
	AR?: string; // Away Team Red Cards
	HBP?: string; // Home Team Bookings Points (10 = yellow, 25 = red)
	ABP?: string; // Away Team Bookings Points (10 = yellow, 25 = red)

	// Odds
	B365H?: string; // Bet365 home win odds
	B365D?: string; // Bet365 draw odds
	B365A?: string; // Bet365 away win odds
	BFH?: string; // Betfair home win odds
	BFD?: string; // Betfair draw odds
	BFA?: string; // Betfair away win odds
	BSH?: string; // Blue Square home win odds
	BSD?: string; // Blue Square draw odds
	BSA?: string; // Blue Square away win odds
	BWH?: string; // Bet&Win home win odds
	BWD?: string; // Bet&Win draw odds
	BWA?: string; // Bet&Win away win odds
	GBH?: string; // Gamebookers home win odds
	GBD?: string; // Gamebookers draw odds
	GBA?: string; // Gamebookers away win odds
	IWH?: string; // Interwetten home win odds
	IWD?: string; // Interwetten draw odds
	IWA?: string; // Interwetten away win odds
	LBH?: string; // Ladbrokes home win odds
	LBD?: string; // Ladbrokes draw odds
	LBA?: string; // Ladbrokes away win odds
	PSH?: string; // Pinnacle home win odds
	PSD?: string; // Pinnacle draw odds
	PSA?: string; // Pinnacle away win odds
	SOH?: string; // Sporting Odds home win odds
	SOD?: string; // Sporting Odds draw odds
	SOA?: string; // Sporting Odds away win odds
	SBH?: string; // Sportingbet home win odds
	SBD?: string; // Sportingbet draw odds
	SBA?: string; // Sportingbet away win odds
	SJH?: string; // Stan James home win odds
	SJD?: string; // Stan James draw odds
	SJA?: string; // Stan James away win odds
	SYH?: string; // Stanleybet home win odds
	SYD?: string; // Stanleybet draw odds
	SYA?: string; // Stanleybet away win odds
	VCH?: string; // VC Bet home win odds
	VCD?: string; // VC Bet draw odds
	VCA?: string; // VC Bet away win odds
	WHH?: string; // William Hill home win odds
	WHD?: string; // William Hill draw odds
	WHA?: string; // William Hill away win odds

	// BetBrain
	Bb1X2?: string; // Number of BetBrain bookmakers used to calculate match odds averages and maximums
	['BbMxH']?: string; // Betbrain maximum home win odds
	['BbAvH']?: string; // Betbrain average home win odds
	['BbMxD']?: string; // Betbrain maximum draw odds
	['BbAvD']?: string; // Betbrain average draw win odds
	['BbMxA']?: string; // Betbrain maximum away win odds
	['BbAvA']?: string; // Betbrain average away win odds
	MaxH?: string; // Market maximum home win odds
	MaxD?: string; // Market maximum draw win odds
	MaxA?: string; // Market maximum away win odds
	AvgH?: string; // Market average home win odds
	AvgD?: string; // Market average draw win odds
	AvgA?: string; // Market average away win odds
	BFEH?: string; // Betfair Exchange home win odds
	BFED?: string; // Betfair Exchange draw odds
	BFEA?: string; // Betfair Exchange away win odds

	// Over/Under 2.5 Goals
	BbOU?: string; // Number of BetBrain bookmakers used to calculate over/under 2.5 goals averages and maximums
	['BbMx>2.5']?: string; // Betbrain maximum over 2.5 goals
	['BbAv>2.5']?: string; // Betbrain average over 2.5 goals
	['BbMx<2.5']?: string; // Betbrain maximum under 2.5 goals
	['BbAv<2.5']?: string; // Betbrain average under 2.5 goals
	['GB>2.5']?: string; // Gamebookers over 2.5 goals
	['GB<2.5']?: string; // Gamebookers under 2.5 goals
	['B365>2.5']?: string; // Bet365 over 2.5 goals
	['B365<2.5']?: string; // Bet365 under 2.5 goals
	['P>2.5']?: string; // Pinnacle over 2.5 goals
	['P<2.5']?: string; // Pinnacle under 2.5 goals
	['Max>2.5']?: string; // Market maximum over 2.5 goals
	['Max<2.5']?: string; // Market maximum under 2.5 goals
	['Avg>2.5']?: string; // Market average over 2.5 goals
	['Avg<2.5']?: string; // Market average under 2.5 goals

	// Asian Handicap
	BbAH?: string; // Number of BetBrain bookmakers used to Asian handicap averages and maximums
	BbAHh?: string; // Betbrain size of handicap (home team)
	AHh?: string; // Market size of handicap (home team) (since 2019/2020)
	['BbMxAHH']?: string; // Betbrain maximum Asian handicap home team odds
	['BbAvAHH']?: string; // Betbrain average Asian handicap home team odds
	['BbMxAHA']?: string; // Betbrain maximum Asian handicap away team odds
	['BbAvAHA']?: string; // Betbrain average Asian handicap away team odds
	GBAHH?: string; // Gamebookers Asian handicap home team odds
	GBAHA?: string; // Gamebookers Asian handicap away team odds
	GBAH?: string; // Gamebookers size of handicap (home team)
	LBAHH?: string; // Ladbrokes Asian handicap home team odds
	LBAHA?: string; // Ladbrokes Asian handicap away team odds
	LBAH?: string; // Ladbrokes size of handicap (home team)
	B365AHH?: string; // Bet365 Asian handicap home team odds
	B365AHA?: string; // Bet365 Asian handicap away team odds
	B365AH?: string; // Bet365 size of handicap (home team)
	PAHH?: string; // Pinnacle Asian handicap home team odds
	PAHA?: string; // Pinnacle Asian handicap away team odds
	MaxAHH?: string; // Market maximum Asian handicap home team odds
	MaxAHA?: string; // Market maximum Asian handicap away team odds
	AvgAHH?: string; // Market average Asian handicap home team odds
	AvgAHA?: string; // Market average Asian handicap away team odds
};

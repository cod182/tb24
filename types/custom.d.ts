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
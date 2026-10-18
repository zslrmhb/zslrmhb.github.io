export type Post = {
	title: string;
	slug: string;
	description?: string;
	summary?: string;
	date: string;
	categories?: string[];
	published: boolean;
};

export type Photo = {
	id: string;
	caption: string;
	url: string;
	thumb: string;
	medium: string;
	width: number;
	height: number;
	thumbWidth: number;
	thumbHeight: number;
	mediumWidth: number;
	mediumHeight: number;
	alt?: string;
	permalink: string;
	takenAt: string;
};

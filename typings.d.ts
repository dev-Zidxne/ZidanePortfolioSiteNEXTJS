interface SanityBody {
	_createdAt: string;
	_id: string;
	_rev: string;
	_updatedAt: string;
}

export interface Image {
	_type: 'image';
	asset: {
		_ref: string;
		_type: 'reference';
	};
}

export interface PageInfo extends SanityBody {
	_type: 'pageInfo';
	address: string;
	backgroundInformation: string;
	email: string;
	role: string;
	heroImage: Image;
	name: string;
	phoneNumber: string;
	profilePic: Image;
	links: Array;
}

export interface Skill extends SanityBody {
	_id: Key | null | undefined;
	_type: 'skill';
	image: Image;
	progress: number;
	title: string;
}
export interface Technology extends SanityBody {
	_id: Key | null | undefined;
	_type: 'technology';
	image: Image;
	progress: number;
	title: string;
}

export interface Experience extends SanityBody {
	_id: Key | null | undefined;
	_type: 'experience';
	company: string;
	companyImage: Image;
	dateStarted: Date;
	dateEnded: Date;
	isCurrentlyWorkingHere: boolean;
	jobTitle: string;
	points: string[];
	technologies: Technology[];
}
export interface Project extends SanityBody {
	title: string;
	_type: 'project';
	image: Image;
	linkToBuild: string;
	summary: string;
	technologies: Technology[];
}
export interface Social extends SanityBody {
	_id: Key | null | undefined;
	_type: 'social';
	title: string;
	url: string;
}

export interface Post extends SanityBody {
	_id: string;
	_key: string;
	_type: 'post';
	title: string;
	slug: _slug;
	current: string;
	author: string;
	name: string;
	mainImage: image;
	authorImage: image;
	categories: array;
	publishedAt: datetime;
	_createdAt: datetime;
	body: blockContent;
}

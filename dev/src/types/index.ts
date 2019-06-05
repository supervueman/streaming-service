export interface RootState {
	version: string;
}

// Types for plugins/requestDataHandler
export interface DataInterface {
	[key: string]: any;
}

export interface ParamsInterface {
	[key: string]: any;
}

export interface HeadersInterface {
	[key: string]: any;
}

export interface RequestDataInterface {
	method: string;
	url: string;
	data?: DataInterface | null;
	params?: ParamsInterface | null;
	headers?: HeadersInterface | null;
}

// Types for authntication

export interface ProfileInterface {
	_id: string;
	slug: string;
	email: string;
	phone?: string;
	website?: string;
	facebook?: string;
	instagram?: string;
	vkontakte?: string;
	firstname: string;
	lastname: string;
	avatar?: string;
	content?: string;
	isActive?: boolean;
}

export interface ProfileState {
	profile: ProfileInterface;
}

// Types for product

export interface ProductInterface {
	_id: string;
	slug: string;
	title: string;
	content: string;
	imageUrl: string;
	price: number;
	createdAt: string;
	updatedAt: string;
}

export interface ProductState {
	product: ProductInterface;
}

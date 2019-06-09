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
}

export interface ProfileState {
	profile: ProfileInterface;
}

// Types all users
export interface UserCardInterface {
	_id: string;
	firstname: string;
	lastname: string;
	avatar: string;
	email: string;
	phone: string;
}

export interface UserCardState {
	userCard: UserCardInterface;
}

export interface UsersState {
	users: {
		users: UserCardInterface[];
		count: 0;
	};
}

export interface UserInterface {
	_id: string;
	firstname?: string;
	lastname?: string;
	avatar?: string;
	email: string;
	phone?: string;
	website?: string;
	facebook?: string;
	instagram?: string;
	vkontakte?: string;
	content?: string;
}

export interface UserState {
	user: UserInterface;
}

// Types for product
export interface ProductCardInterface {
	_id: string;
	title: string;
	imageUrl: string;
	price: number;
}

export interface ProductsState {
	products: {
		products: ProductCardInterface[];
		count: number;
	};
}

export interface ProductInterface {
	_id: string;
	title: string;
	imageUrl: string;
	price: number;
	content: string;
}

export interface ProductState {
	product: ProductInterface;
}

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

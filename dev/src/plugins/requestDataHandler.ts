/**
 * @module requestData
 * @function
 * @param {String} method
 * @param {String} url
 * @param {Object} data
 * @param {Object} params
 * @var {String} access_token
 * @var {Object} requestData
 * @var {Boolean} isData
 * @var {Boolean} isParams
 * @var {Boolean} isAccessToken
 * @var {Boolean} isId
 * @return {Object}
 */

import {
	DataInterface,
	ParamsInterface,
	HeadersInterface,
	RequestDataInterface
} from '@/types';

export default (
	method: string,
	url: string,
	data: DataInterface | null | string,
	params: ParamsInterface | null,
	headers: HeadersInterface | null
): RequestDataInterface => {
	const access_token: string | null = localStorage.getItem('access_token');
	const requestData: RequestDataInterface = {
		method,
		url,
		headers: {
			'Content-Type': 'application/json'
		}
	};

	if (headers !== undefined && headers !== null) {
		requestData.headers = headers;
	}

	if (data !== null && data !== undefined) {
		requestData.data = data;
	}

	if (params !== undefined && params !== null) {
		requestData.params = params;
	}

	if (access_token !== null && access_token !== undefined) {
		requestData.headers.Authorization = access_token;
	}

	return requestData;
};

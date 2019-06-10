import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import {
	StreamState,
	StreamInterface,
	ProfileInterface,
	ProductInterface,
	RootState
} from '@/types';

import { apolloClient } from '@/plugins/apolloProvider';
import { CREATE_STREAM } from '@/graphql/mutations/createStream';
// import { QUERY_STREAM} from '@/graphql/queries/queryProduct';
// import { EDIT_STREAM} from '@/graphql/mutations/editProduct';
// import { DELETE_STREAM} from '@/graphql/mutations/deleteProduct';

// import router from '@/routers';

const state: StreamState = {
	stream: {
		_id: '',
		title: '',
		imageUrl: '',
		streamer: {
			_id: '',
			email: '',
			phone: '',
			firstname: '',
			lastname: '',
			avatar: '',
			website: '',
			facebook: '',
			instagram: '',
			vkontakte: ''
		},
		product: {
			_id: '',
			title: '',
			imageUrl: '',
			price: 0,
			content: ''
		}
	}
};

const mutations: MutationTree<StreamState> = {
	setStream(state, payload): void {
		state.stream = payload;
	}
};

const actions: ActionTree<StreamState, RootState> = {
	/**
	 * @function createStream
	 * @async
	 * @param {Object} payload {title, imageUrl}
	 */
	async createStream(undefined, payload): Promise<void> {
		await apolloClient.mutate({
			mutation: CREATE_STREAM,
			variables: {
				prodId: payload.prodId,
				title: payload.title,
				imageUrl: payload.imageUrl
			}
		});
	}

	/**
	 * @function fetchStream
	 * @async
	 * @param {String} payload id
	 */
	// async fetchStream({ commit }, payload): Promise<void> {
	// 	const res: any = await apolloClient.query({
	// 		query: QUERY_PRODUCT,
	// 		variables: {
	// 			id: payload
	// 		}
	// 	});

	// 	commit('setProduct', res.data.queryProduct);
	// },

	/**
	 * @function editProfile
	 * @async
	 * @param {Object} payload {id, title, imageUrl, price, content}
	 */
	// async editProduct({ commit }, payload): Promise<void> {
	// 	const res: any = await apolloClient.mutate({
	// 		mutation: EDIT_PRODUCT,
	// 		variables: {
	// 			prodId: payload._id,
	// 			title: payload.title,
	// 			imageUrl: payload.imageUrl,
	// 			price: payload.price,
	// 			content: payload.content
	// 		}
	// 	});

	// 	commit('setProduct', res.data.editProduct);
	// },

	/**
	 * @function deleteProduct
	 * @async
	 * @param {String} payload id
	 */
	// async deleteProduct(undefined, payload): Promise<void> {
	// 	const res: any = await apolloClient.mutate({
	// 		mutation: DELETE_PRODUCT,
	// 		variables: {
	// 			id: payload
	// 		}
	// 	});

	// 	if (res.data.deleteProduct) {
	// 		router.push('/products');
	// 	}
	// }
};

const getters: GetterTree<StreamState, RootState> = {
	getStream(state): StreamInterface {
		return state.stream;
	}
};

export const stream: Module<StreamState, RootState> = {
	state,
	getters,
	actions,
	mutations,
	namespaced: true
};

import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { StreamState, StreamInterface, RootState } from '@/types';

import { apolloClient } from '@/plugins/apolloProvider';
import { CREATE_STREAM } from '@/graphql/mutations/createStream';
import { QUERY_STREAM } from '@/graphql/queries/queryStream';
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
			firstname: '',
			lastname: '',
			avatar: ''
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
	},

	/**
	 * @function fetchStream
	 * @async
	 * @param {String} payload id
	 */
	async fetchStream({ commit }, payload): Promise<void> {
		const res: any = await apolloClient.query({
			query: QUERY_STREAM,
			variables: {
				id: payload
			}
		});

		commit('setStream', res.data.queryStream);
	}

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

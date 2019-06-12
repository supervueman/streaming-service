import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { StreamState, StreamInterface, RootState } from '@/types';

import { apolloClient } from '@/plugins/apolloProvider';
import { CREATE_STREAM } from '@/graphql/mutations/createStream';
import { QUERY_STREAM } from '@/graphql/queries/queryStream';
import { EDIT_STREAM } from '@/graphql/mutations/editStream';
import { DELETE_STREAM } from '@/graphql/mutations/deleteStream';

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
			avatar: '',
			isStream: false
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
	async createStream({ commit }, payload): Promise<void> {
		const res = await apolloClient.mutate({
			mutation: CREATE_STREAM,
			variables: {
				prodId: payload.prodId,
				title: payload.title,
				imageUrl: payload.imageUrl
			}
		});

		commit('setStream', res.data.createStream);
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
	},

	/**
	 * @function editStream
	 * @async
	 * @param {Object} payload {id, title, imageUrl, price, content}
	 */
	async editStream({ commit }, payload): Promise<void> {
		console.log(payload);
		const res: any = await apolloClient.mutate({
			mutation: EDIT_STREAM,
			variables: {
				id: payload._id,
				prodId: payload.prodId,
				title: payload.title,
				imageUrl: payload.imageUrl
			}
		});

		commit('setStream', res.data.editStream);
	},

	/**
	 * @function deleteStream
	 * @async
	 * @param {String} payload id
	 */
	async deleteStream({ commit }, payload): Promise<void> {
		const res: any = await apolloClient.mutate({
			mutation: DELETE_STREAM,
			variables: {
				id: payload
			}
		});
		commit('setStream', {
			_id: '',
			title: '',
			imageUrl: '',
			streamer: {
				_id: '',
				email: '',
				firstname: '',
				lastname: '',
				avatar: '',
				isStream: false
			},
			product: {
				_id: '',
				title: '',
				imageUrl: '',
				price: 0,
				content: ''
			}
		});
	}
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

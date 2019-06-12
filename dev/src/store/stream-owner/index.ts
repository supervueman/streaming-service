import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { StreamOwnerState, StreamInterface, RootState } from '@/types';

import { apolloClient } from '@/plugins/apolloProvider';
import { QUERY_STREAM } from '@/graphql/queries/queryStream';

import router from '@/routers';

const state: StreamOwnerState = {
	streamOwner: {
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

const mutations: MutationTree<StreamOwnerState> = {
	setStream(state, payload): void {
		state.streamOwner = payload;
	}
};

const actions: ActionTree<StreamOwnerState, RootState> = {
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
};

const getters: GetterTree<StreamOwnerState, RootState> = {
	getStream(state): StreamInterface {
		return state.streamOwner;
	}
};

export const streamOwner: Module<StreamOwnerState, RootState> = {
	state,
	getters,
	actions,
	mutations,
	namespaced: true
};

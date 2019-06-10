import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { StreamsState, StreamCardInterface, RootState } from '@/types';

import { apolloClient } from '@/plugins/apolloProvider';

import { QUERY_STREAMS } from '@/graphql/queries/queryStreams';

const state: StreamsState = {
	streams: {
		streams: [],
		count: 0
	}
};

const mutations: MutationTree<StreamsState> = {
	setStreams(state, payload): void {
		state.streams = payload;
	}
};

const actions: ActionTree<StreamsState, RootState> = {
	/**
	 * @function fetchStreams
	 * @async
	 */
	async fetchStreams({ commit }): Promise<void> {
		const res: any = await apolloClient.query({
			query: QUERY_STREAMS
		});

		commit('setStreams', res.data.queryStreams);
	}
};

const getters: GetterTree<StreamsState, RootState> = {
	getStreams(state): StreamCardInterface[] {
		return state.streams.streams;
	},
	getCount(state): number {
		return state.streams.count;
	}
};

export const streams: Module<StreamsState, RootState> = {
	state,
	getters,
	actions,
	mutations,
	namespaced: true
};

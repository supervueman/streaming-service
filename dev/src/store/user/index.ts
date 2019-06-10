import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { UserState, UserInterface, RootState } from '@/types';

import { apolloClient } from '@/plugins/apolloProvider';

import { QUERY_USER } from '@/graphql/queries/queryUser';

const state: UserState = {
	user: {
		_id: '',
		firstname: '',
		lastname: '',
		avatar: '',
		email: '',
		phone: '',
		website: '',
		facebook: '',
		instagram: '',
		vkontakte: '',
		content: ''
	}
};

const mutations: MutationTree<UserState> = {
	setUser(state, payload): void {
		state.user = payload;
	}
};

const actions: ActionTree<UserState, RootState> = {
	/**
	 * @function fetchUser
	 * @async
	 */
	async fetchUser({ commit }, payload): Promise<void> {
		const res: any = await apolloClient.query({
			query: QUERY_USER,
			variables: {
				id: payload
			}
		});

		commit('setUser', res.data.queryUser);
	}
};

const getters: GetterTree<UserState, RootState> = {
	getUser(state): UserInterface {
		return state.user;
	}
};

export const user: Module<UserState, RootState> = {
	state,
	getters,
	actions,
	mutations,
	namespaced: true
};

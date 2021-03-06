import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { UsersState, UserCardInterface, RootState } from '@/types';

import { apolloClient } from '@/plugins/apolloProvider';

import { QUERY_USERS } from '@/graphql/queries/queryUsers';

const state: UsersState = {
	users: {
		users: [],
		count: 0
	}
};

const mutations: MutationTree<UsersState> = {
	setUsers(state, payload): void {
		state.users = payload;
	}
};

const actions: ActionTree<UsersState, RootState> = {
	/**
	 * @function fetchUsers
	 * @async
	 */
	async fetchUsers({ commit }): Promise<void> {
		const res: any = await apolloClient.query({
			query: QUERY_USERS
		});

		commit('setUsers', res.data.queryUsers);
	}
};

const getters: GetterTree<UsersState, RootState> = {
	getUsers(state): UserCardInterface[] {
		return state.users.users;
	},
	getCount(state): number {
		return state.users.count;
	}
};

export const users: Module<UsersState, RootState> = {
	state,
	getters,
	actions,
	mutations,
	namespaced: true
};

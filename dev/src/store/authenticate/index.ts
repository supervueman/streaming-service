import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { ProfileState, ProfileInterface, RootState } from '@/types';

import router from '@/routers';

import { apolloClient } from '@/plugins/apolloProvider';
import { SIGN_UP } from '@/graphql/mutations/signUp';
import { SIGN_IN } from '@/graphql/queries/signIn';
import { QUERY_PROFILE } from '@/graphql/queries/queryProfile';

const state: ProfileState = {
	profile: {
		_id: '',
		email: '',
		phone: '',
		website: '',
		facebook: '',
		vkontakte: '',
		instagram: '',
		firstname: '',
		lastname: '',
		avatar: '',
		content: '',
		isStream: false
	}
};

const mutations: MutationTree<ProfileState> = {
	setProfile(state, payload): void {
		state.profile = payload;
	}
};

const actions: ActionTree<ProfileState, RootState> = {
	/**
	 * @function signUp
	 * @async
	 * @param {Object} payload {email, password}
	 */
	async signUp(undefined, payload): Promise<void> {
		await apolloClient.mutate({
			mutation: SIGN_UP,
			variables: {
				email: payload.email,
				password: payload.password,
				isStream: false
			}
		});
	},

	/**
	 * @function signIn
	 * @async
	 * @param {Object} payload {email, password}
	 */
	async signIn({ commit }, payload): Promise<void> {
		const res = await apolloClient.query({
			query: SIGN_IN,
			variables: {
				email: payload.email,
				password: payload.password
			}
		});

		localStorage.setItem('uid', res.data.login.userId);
		localStorage.setItem('access_token', res.data.login.token);

		commit('setProfile', {
			_id: res.data.login.userId,
			email: 'test'
		});
		await this.dispatch('authenticate/fetchProfile');

		router.push('/profile');
	},

	async fetchProfile({ commit }): Promise<void> {
		const res = await apolloClient.query({
			query: QUERY_PROFILE,
			variables: {
				token: localStorage.getItem('access_token')
			}
		});

		commit('setProfile', res.data.queryProfile);
		if (
			router.app.$route.name === 'signin' ||
			router.app.$route.name === 'signup'
		) {
			router.push('/profile');
		}
	},

	async logout({ commit }): Promise<void> {
		localStorage.removeItem('access_token');
		localStorage.removeItem('uid');
		commit('setProfile', {
			_id: '',
			email: '',
			phone: '',
			website: '',
			facebook: '',
			vkontakte: '',
			instagram: '',
			firstname: '',
			lastname: '',
			avatar: '',
			content: '',
			isStream: false
		});
		router.push('/');
	}
};

const getters: GetterTree<ProfileState, RootState> = {
	getProfile(state): ProfileInterface {
		return state.profile;
	}
};

export const authenticate: Module<ProfileState, RootState> = {
	state,
	getters,
	actions,
	mutations,
	namespaced: true
};

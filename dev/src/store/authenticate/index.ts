import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { ProfileState, RootState, RequestDataInterface } from '../../types';
import axios from 'axios';
import requestDataHandler from '../../plugins/requestDataHandler';

import router from '../../routers';

import { apolloClient } from '../../plugins/apolloProvider';
import { SIGN_UP } from '../../graphql/signUp';
import { SIGN_IN } from '../../graphql/signIn';
import { QUERY_PROFILE } from '../../graphql/queryProfile';

const state: ProfileState = {
	profile: {
		_id: '',
		slug: '',
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
		isActive: false
	}
};

const mutations: MutationTree<ProfileState> = {
	setProfile(state, payload) {
		state.profile = payload;
	}
};

const actions: ActionTree<ProfileState, RootState> = {
	/**
	 * @function signUp
	 * @async
	 * @param {Object} payload {email, password}
	 */
	async signUp(undefined, payload) {
		await apolloClient.mutate({
			mutation: SIGN_UP,
			variables: {
				email: payload.email,
				password: payload.password
			}
		});
	},

	/**
	 * @function signIn
	 * @async
	 * @param {Object} payload {email, password}
	 */
	async signIn({ commit }, payload) {
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

	async fetchProfile({ commit }) {
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

	async logout({ commit }) {
		// const data: RequestDataInterface = requestDataHandler(
		// 	'POST',
		// 	'/user/logout',
		// 	null,
		// 	null,
		// 	null
		// );

		// const res: any = await axios(data).catch(err => {
		// 	console.error(err);
		// });

		// if (res) {
		// 	if (res.status === 200) {
		// 		localStorage.removeItem('access_token');
		// 		commit('setProfile', {
		// 			_id: '',
		// 			email: ''
		// 		});

		// 	}
		// }
		localStorage.removeItem('access_token');
		localStorage.removeItem('uid');
		commit('setProfile', {
			_id: '',
			slug: '',
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
			isActive: false
		});
		router.push('/');
	}
};

const getters: GetterTree<ProfileState, RootState> = {
	getProfile(state) {
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

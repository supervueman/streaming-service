import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { ProfileState, RootState, RequestDataInterface } from '../../types';
import axios from 'axios';
import router from '../../routers';

import requestDataHandler from '../../plugins/requestDataHandler';

import { apolloClient } from '../../plugins/apolloProvider';
import { SIGN_UP } from '../../graphql/signUp';
import { SIGN_IN } from '../../graphql/signIn';

const state: ProfileState = {
	profile: {
		_id: '',
		email: ''
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
	async signIn(undefined, payload) {
		const res = await apolloClient.query({
			query: SIGN_IN,
			variables: {
				email: payload.email,
				password: payload.password
			}
		});

		console.log(res);

		localStorage.setItem('uid', res.data.login.token);
		localStorage.setItem('access_token', res.data.login.userId);
		// this.dispatch('authenticate/fetchProfile');
	},

	async fetchProfile({ commit }) {
		const data: RequestDataInterface = requestDataHandler(
			'GET',
			'/user/profile',
			null,
			null,
			{
				'x-access-token': localStorage.getItem('access_token')
			}
		);
		const res: any = await axios(data).catch(err => {
			console.error(err);
		});
		if (res) {
			if (res.status === 200) {
				commit('setProfile', res.data);
				router.push('/profile');
			}
		}
	},

	async logout({ commit }) {
		const data: RequestDataInterface = requestDataHandler(
			'POST',
			'/user/logout',
			null,
			null,
			null
		);

		const res: any = await axios(data).catch(err => {
			console.error(err);
		});

		if (res) {
			if (res.status === 200) {
				localStorage.removeItem('access_token');
				commit('setProfile', {
					_id: '',
					email: ''
				});
				router.push('/');
			}
		}
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

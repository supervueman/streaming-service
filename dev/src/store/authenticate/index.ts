import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { ProfileState, RootState, RequestDataInterface } from '../../types';

import axios from 'axios';
import router from '../../routers';

import requestDataHandler from '../../plugins/requestDataHandler';

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
	async signUp(undefined, payload) {
		const data: RequestDataInterface = requestDataHandler(
			'POST',
			'/user/signup',
			payload,
			null,
			null
		);
		await axios(data).catch(err => {
			console.error(err);
		});
	},

	async signIn(undefined, payload) {
		const data: RequestDataInterface = requestDataHandler(
			'POST',
			'/user/signin',
			payload,
			null,
			null
		);
		const res: any = await axios(data).catch(err => {
			console.error(err);
		});
		localStorage.setItem('access_token', res.data.token);
		this.dispatch('authenticate/fetchProfile');
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
			'GET',
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

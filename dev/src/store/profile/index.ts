import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { ProfileState, RootState } from '../../types';

import { apolloClient } from '../../plugins/apolloProvider';

import { EDIT_PROFILE } from '../../graphql/editProfile';

// const state: ProfileState = {
// 	profile: {
// 		_id: '',
// 		slug: '',
// 		email: '',
// 		phone: '',
// 		website: '',
// 		facebook: '',
// 		vkontakte: '',
// 		instagram: '',
// 		firstname: '',
// 		lastname: '',
// 		avatar: '',
// 		content: '',
// 		isActive: false
// 	}
// };

// const mutations: MutationTree<ProfileState> = {
// 	setProfile(state, payload) {
// 		state.profile = payload;
// 	}
// };

const actions: ActionTree<ProfileState, RootState> = {
	/**
	 * @function signUp
	 * @async
	 * @param {Object} payload {email, password}
	 */
	async editProfile(undefined, payload) {
		const res = await apolloClient.mutate({
			mutation: EDIT_PROFILE,
			variables: {
				slug: payload.slug,
				email: payload.email,
				phone: payload.phone,
				website: payload.website,
				facebook: payload.facebook,
				vkontakte: payload.vkontakte,
				instagram: payload.instagram,
				firstname: payload.firstname,
				lastname: payload.lastname,
				avatar: payload.avatar,
				content: payload.content,
				isActive: true
			}
		});

		console.log(res);
	}
};

// const getters: GetterTree<ProfileState, RootState> = {
// 	getProfile(state) {
// 		return state.profile;
// 	}
// };

export const profile: Module<ProfileState, RootState> = {
	// state,
	// getters,
	actions,
	// mutations,
	namespaced: true
};

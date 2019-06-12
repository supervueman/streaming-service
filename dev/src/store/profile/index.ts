import { ActionTree, Module } from 'vuex';
import { ProfileState, RootState } from '@/types';

import { apolloClient } from '@/plugins/apolloProvider';

import { EDIT_PROFILE } from '@/graphql/mutations/editProfile';

const actions: ActionTree<ProfileState, RootState> = {
	/**
	 * @function editProfile
	 * @async
	 * @param {Object} payload {email, password}
	 */
	async editProfile(undefined, payload): Promise<void> {
		await apolloClient.mutate({
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
				isStream: payload.isStream
			}
		});
	}
};

export const profile: Module<ProfileState, RootState> = {
	actions,
	namespaced: true
};

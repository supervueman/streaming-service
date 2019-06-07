import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { ProductState, RootState } from '../../types';

import { apolloClient } from '../../plugins/apolloProvider';
import { CREATE_PRODUCT } from '../../graphql/createProduct';

const state: ProductState = {
	product: {
		_id: '',
		title: '',
		content: '',
		imageUrl: '',
		price: 0,
		createdAt: '',
		updatedAt: ''
	}
};

const mutations: MutationTree<ProductState> = {
	setProduct(state, payload) {
		state.product = payload;
	}
};

const actions: ActionTree<ProductState, RootState> = {
	/**
	 * @function addProduct
	 * @async
	 * @param {Object} payload {title, content, imageUrl, price}
	 */
	async addProduct(undefined, payload) {
		const product = await apolloClient.mutate({
			mutation: CREATE_PRODUCT,
			variables: {
				title: payload.title,
				content: payload.content,
				imageUrl: payload.imageUrl,
				price: payload.price
			}
		});
	}
};

const getters: GetterTree<ProductState, RootState> = {
	getProduct(state) {
		return state.product;
	}
};

export const product: Module<ProductState, RootState> = {
	state,
	getters,
	actions,
	mutations,
	namespaced: true
};
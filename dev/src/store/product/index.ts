import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { ProductState, RootState } from '../../types';

import { apolloClient } from '../../plugins/apolloProvider';
import { CREATE_PRODUCT } from '../../graphql/createProduct';
import { QUERY_PRODUCT } from '../../graphql/queryProduct';
import { EDIT_PRODUCT } from '../../graphql/editProduct';
import { DELETE_PRODUCT } from '../../graphql/deleteProduct';

import router from '../../routers';

const state: ProductState = {
	product: {
		_id: '',
		title: '',
		imageUrl: '',
		price: 0,
		content: ''
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
		await apolloClient.mutate({
			mutation: CREATE_PRODUCT,
			variables: {
				title: payload.title,
				imageUrl: payload.imageUrl,
				price: payload.price,
				content: payload.content
			}
		});
	},

	/**
	 * @function fetchProduct
	 * @async
	 * @param {String} payload id
	 */
	async fetchProduct({ commit }, payload) {
		const res: any = await apolloClient.query({
			query: QUERY_PRODUCT,
			variables: {
				id: payload
			}
		});

		commit('setProduct', res.data.queryProduct);
	},

	/**
	 * @function editProfile
	 * @async
	 * @param {Object} payload {id, title, imageUrl, price, content}
	 */
	async editProduct({ commit }, payload) {
		const res: any = await apolloClient.mutate({
			mutation: EDIT_PRODUCT,
			variables: {
				prodId: payload._id,
				title: payload.title,
				imageUrl: payload.imageUrl,
				price: payload.price,
				content: payload.content
			}
		});

		commit('setProduct', res.data.editProduct);
	},

	/**
	 * @function deleteProduct
	 * @async
	 * @param {String} payload id
	 */
	async deleteProduct(undefined, payload) {
		const res: any = await apolloClient.mutate({
			mutation: DELETE_PRODUCT,
			variables: {
				id: payload
			}
		});

		if (res.data.deleteProduct) {
			router.push('/products');
		}
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

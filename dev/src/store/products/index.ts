import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { ProductsState, RootState } from '../../types';

import { apolloClient } from '../../plugins/apolloProvider';

import { QUERY_PRODUCTS } from '../../graphql/queryProducts';

const state: ProductsState = {
	products: {
		products: [],
		count: 0
	}
};

const mutations: MutationTree<ProductsState> = {
	setProducts(state, payload) {
		state.products = payload;
	}
};

const actions: ActionTree<ProductsState, RootState> = {
	/**
	 * @function fetchProducts
	 * @async
	 */
	async fetchProducts({ commit }) {
		const res: any = await apolloClient.query({
			query: QUERY_PRODUCTS
		});

		commit('setProducts', res.data.queryProducts);
	}
};

const getters: GetterTree<ProductsState, RootState> = {
	getProducts(state) {
		return state.products.products;
	},
	getCount(state) {
		return state.products.count;
	}
};

export const products: Module<ProductsState, RootState> = {
	state,
	getters,
	actions,
	mutations,
	namespaced: true
};

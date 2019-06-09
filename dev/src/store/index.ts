import Vue from 'vue';
import Vuex from 'vuex';

import { authenticate } from './authenticate';
import { profile } from './profile';
import { products } from './products';
import { product } from './product';
import { users } from './users';
import { user } from './user';

Vue.use(Vuex);

export const store = new Vuex.Store({
	modules: {
		authenticate,
		profile,
		products,
		product,
		users,
		user
	}
});

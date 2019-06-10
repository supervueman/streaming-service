import Vue from 'vue';
import Vuex from 'vuex';

import { authenticate } from '@/store/authenticate';
import { profile } from '@/store/profile';
import { products } from '@/store/products';
import { product } from '@/store/product';
import { users } from '@/store/users';
import { user } from '@/store/user';

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

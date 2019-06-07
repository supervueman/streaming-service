import Vue from 'vue';
import Vuex from 'vuex';

import { authenticate } from './authenticate';
import { product } from './product';
import { profile } from './profile';
import { users } from './users';

Vue.use(Vuex);

export const store = new Vuex.Store({
	modules: {
		authenticate,
		profile,
		product,
		users
	}
});

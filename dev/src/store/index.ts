import Vue from 'vue';
import Vuex from 'vuex';

import { authenticate } from './authenticate';
import { product } from './product';
import { profile } from './profile';

Vue.use(Vuex);

export const store = new Vuex.Store({
	modules: {
		authenticate,
		profile,
		product
	}
});

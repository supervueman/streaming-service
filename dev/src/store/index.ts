import Vue from 'vue';
import Vuex from 'vuex';

import { authenticate } from './authenticate';

Vue.use(Vuex);

export const store = new Vuex.Store({
	modules: {
		authenticate
	}
});
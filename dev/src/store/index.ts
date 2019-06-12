import Vue from 'vue';
import Vuex from 'vuex';

import { authenticate } from '@/store/authenticate';
import { profile } from '@/store/profile';
import { products } from '@/store/products';
import { product } from '@/store/product';
import { users } from '@/store/users';
import { user } from '@/store/user';
import { streams } from '@/store/streams';
import { stream } from '@/store/stream';
import { streamOwner } from '@/store/stream-owner';

Vue.use(Vuex);

export const store = new Vuex.Store({
	modules: {
		authenticate,
		profile,
		products,
		product,
		users,
		user,
		streams,
		stream,
		streamOwner
	}
});

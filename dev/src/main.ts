import Vue from 'vue';
import '@/plugins/vuetify';
import sharedComponents from '@/plugins/sharedComponentsRequire';
import App from '@/App.vue';
import router from '@/routers';
import { store } from '@/store';
import axios from 'axios';
import 'vuetify/dist/vuetify.min.css';
import apolloProvider from '@/plugins/apolloProvider';

sharedComponents();

Vue.config.productionTip = false;
const baseUrl: string =
	process.env.NODE_ENV === 'development'
		? process.env.VUE_APP_SERVER_URL_DEV
		: process.env.VUE_APP_SERVER_URL_PROD;

axios.defaults.baseURL = baseUrl;

new Vue({
	router,
	store,
	apolloProvider,
	render: h => h(App)
}).$mount('#app');

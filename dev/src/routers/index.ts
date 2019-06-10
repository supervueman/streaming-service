import Vue from 'vue';
import Router from 'vue-router';

import paths from './paths';

/**
 * @function route
 * @param {string} path
 * @param {string} name
 * @param {component} component
 * @returns {object}
 * Функция возвращает объект роутера
 */

interface RouteInterface {
	path: string;
	name: string;
	component: Function;
}

function route(path: string, name: string, component: string): RouteInterface {
	return {
		path,
		name,
		component: (): Promise<Function> => import(`@/pages/${component}.vue`)
	};
}

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: paths.map(
		(path): RouteInterface => route(path.path, path.name, path.component)
	)
});

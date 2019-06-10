import Vue from 'vue';

export default (): void => {
	const requireComponent = require.context(
		// Относительный путь до каталога компонентов
		'@/components/Shared',
		// Обрабатывать или нет подкаталоги
		false,
		// Регулярное выражение для определения файлов базовых компонентов
		/[A-Z]\w+\.(vue)$/
	);

	// type Func = (fileName: string) => void;

	requireComponent.keys().forEach(
		(fileName): void => {
			const componentConfig = requireComponent(fileName);

			const componentName: string = fileName
				.split('/')
				.pop()
				.replace(/\.\w+$/, '');

			Vue.component(componentName, componentConfig.default || componentConfig);
		}
	);
};

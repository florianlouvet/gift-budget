import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';
import path from 'path';

export default {
	kit: {
		adapter: vercel(),
		target: '#svelte',
		// ssr: false
		// vite: {
		// 	resolve: {
		// 		alias: {
		// 			'$stores': path.resolve('./src/stores'),
		// 		}
		// 	}
		// },
	},



	preprocess: [
		preprocess({
			postcss: true,
		}),
	],
};
